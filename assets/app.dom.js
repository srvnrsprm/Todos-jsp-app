var asyncRqst, rsltsElmnt = document.getElementById( "rslts" );
var notifyElmnt = document.getElementsByClassName( "notify" )[0];

$( "#evnt-dt" ).datepicker( { 
	autoSize: true,
	showOn: "button",
 	buttonImage: "assets/calendar.png",
});
$( "#submit" ).button();

function hndlSave() {
	console.log( "hndlSave event listener is called" );
	$( this ).off( "click" );
	var txtAreaPrnt = $(this).closest( "tr" ).prev().children()[0];
	sndRqst( hndlDlt, "POST", "api/update?itmCntnt=" + $(txtAreaPrnt).children()[0].value + "&evntId=" + $(this).attr( "data-id" ) );
	$( this ).attr( "src", "assets/imgs/pencil.svg" );
	$( this ).click( hndlEdit );
}

function hndlEdit() {
	console.log( "hndlEdit event listener is called" );
	$(this).closest( "tr" ).prev().children()[0].innerHTML = "<textarea rows=3 columns=50 style='width:100%;'>" + $(this).closest( "tr" ).prev().children()[0].innerText + "</textarea>";
	$( this ).attr( "src", "assets/imgs/check.svg" );
	$( this ).off( "click" ); 
	$( this ).click( hndlSave );
}

$( ".edit" ).click( hndlEdit );

function sndRqst( cllbckFn, mthd, url ) {
	asyncRqst = new XMLHttpRequest();
	asyncRqst.onreadystatechange = cllbckFn;
	asyncRqst.open( mthd, url, true );
	asyncRqst.send( null );
}

function addRmndr( frmElmnt) {
	var itmCntnt = frmElmnt.itmCntnt.value, evntDt = frmElmnt.evntDt.value;

	if( itmCntnt && vldtDt( evntDt ) ) 
		sndRqst( hndlDlt, "POST", "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt );
}

function dltRmndr( id ) {
	console.log( "dltRmndr function called" );
	sndRqst( hndlDlt, "POST", "api/delete?evntId=" + id );
}

var xsl;
sndRqst( function( ) {
	if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
		alert( "Error in processing the request, " + asyncRqst.status );
	} else if( asyncRqst.readyState == 4 ) {
		xsl = asyncRqst.responseXML;
	}		
} , "GET", "assets/reminders.xsl" ); 

function dltNotifyRow( elmnt) {
	$( elmnt ).closest( "table" ).fadeOut( 5000 );
}

function hndlDlt() {
	if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
		alert( "Error in processing the request, " + asyncRqst.status );
	} else if( asyncRqst.readyState == 4 ) {
		sndRqst( function() {
			if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
				alert( "Error in processing the request, " + asyncRqst.status );
			} else if( asyncRqst.readyState == 4 ) {
				var xsltProcessor = new XSLTProcessor();
				xsltProcessor.importStylesheet( xsl );
				var result = xsltProcessor.transformToFragment( asyncRqst.responseXML, document ); 
				$( rsltsElmnt ).empty();
				rsltsElmnt.appendChild( result );
				console.log( "The asynchronous request response text is " + asyncRqst.responseText.substring( 0, 20 ) );
				var txtContent = asyncRqst.status //+ ", " + asyncRqst.responseText.substring( 0, 20 ) || "Ok";
				notifyElmnt.innerHTML += "<table><colgroup><col width=90%><col width=10%></colgroup><tr><td>" + txtContent + "</td><td onClick='dltNotifyRow(this)'>&times;</td></tr></table>";
				//$( ".notify table:last" ).fadeOut( 5000, function() { $( this ).remove() } );
				$( ".edit" ).click( hndlEdit );
			}
		}, "GET", "api/get" ); 
	}
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
