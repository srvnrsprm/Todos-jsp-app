var asyncRqst, rsltsElmnt = document.getElementById( "rslts" );
var notifyElmnt = document.getElementsByClassName( "notify" )[0];

$( "#evnt-dt" ).datepicker( { 
	autoSize: true,
	showOn: "button",
 	buttonImage: "assets/calendar.png",
});
$( "#submit" ).button();

function hndlSave() {
	$( this ).off( "click" );
	var txtAreaPrnt = $(this).closest( "tr" ).prev().children()[0];
	$.ajax({ url: "api/update?itmCntnt=" + $(txtAreaPrnt).children()[0].value + "&evntId=" + $(this).attr( "data-id" ), 
		type: "post",
		success: hndlDlt,
		error: notifyErrr
		});
	$( this ).attr( "src", "assets/imgs/pencil.svg" );
	$( this ).click( hndlEdit );
}

function hndlEdit() {
	$(this).closest( "tr" ).prev().children()[0].innerHTML = "<textarea rows=3 columns=50 style='width:100%;'>" + $(this).closest( "tr" ).prev().children()[0].innerText + "</textarea>";
	$( this ).attr( "src", "assets/imgs/check.svg" );
	$( this ).off( "click" ); 
	$( this ).click( hndlSave );
}

$( ".edit" ).click( hndlEdit );

function addRmndr( frmElmnt) {
	var itmCntnt = frmElmnt.itmCntnt.value, evntDt = frmElmnt.evntDt.value;

	if( itmCntnt && vldtDt( evntDt ) ) 
		$.ajax({ url: "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt, 
			type: "post", 
			success: hndlDlt,
			error: notifyErrr
		});
}

function dltRmndr( id ) {
	console.log( "dltRmndr function called" );
	$.ajax({ url: "api/delete?evntId=" + id,
		type: "post",
		success: hndlDlt,
		error: notifyErrr
	});
}

function notifyErrr( xhr, errrMsg ) {
	notifyElmnt.innerHTML += "<table><colgroup><col width=90%><col width=10%></colgroup><tr><td>" + errrMsg + "</td><td onClick='dltNotifyRow(this)'>&times;</td></tr></table>";
	$( ".notify table:last" ).fadeOut( 5000, function() { $( this ).remove() } );
}

var xsl;
$.ajax( { url: "assets/reminders.xsl", 
		type: "get", 
		success: function(rspns) {
			xsl = rspns;
		},
		error: notifyErrr 
});

function dltNotifyRow( elmnt) {
	$( elmnt ).closest( "table" ).fadeOut( 5000 );
}

function hndlDlt( rspns ) {
	$.get( "api/get", null, function( rspns, stts ) {
		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet( xsl );
		var result = xsltProcessor.transformToFragment( rspns, document ); 
		$( rsltsElmnt ).empty();
		rsltsElmnt.appendChild( result );
		notifyErrr( null, stts );
		$( ".edit" ).click( hndlEdit );
	}, "xml");
}

function vldtDt( inptDt ) {
	var dtPrts = inptDt.split("/"), slctdDt = new Date( parseInt(dtPrts[2]), parseInt(dtPrts[0])-1, parseInt(dtPrts[1] ) );
	var mscndsPrDy = 1000 * 60 * 60 * 24, drtn = (slctdDt.getTime() - new Date().getTime() ) / mscndsPrDy;	

	if( drtn <= -1 ) {
		$( "#dt-errr" ).dialog( { title : "Invalid date" } );
		return false;
	} 
	return true;
}
