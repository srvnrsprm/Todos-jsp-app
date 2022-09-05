var rsltsElmnt = document.getElementById( "rslts" ), frmValid = true;
var asyncRqsti, $ = document.createElement.bind(document);

function sndRqst( cllbckFn, mthd, url ) {
	asyncRqst = new XMLHttpRequest();
	asyncRqst.onreadystatechange = cllbckFn;
	asyncRqst.open( mthd, url, true );
	asyncRqst.send( null );
}

function addRmndrToDOM( i, rmndr ) {
	var itmTbl = $("table" ), tBdy = $("tbody" ), itmRw = $( "tr" ), itmRw1 = $("tr");
	var itmCll = $("td"), itmCll1 = $("td"), itmCll2 = $("td"), itmCll3 = $("td");
	var itmCntnt = rmndr.getElementsByTagName( "itmCntnt" )[0].firstChild.nodeValue, evntDt = rmndr.getElementsByTagName(
"evntDt" )[0].firstChild.nodeValue.substring( 0, 10 ); 

	itmCll.innerHTML = itmCntnt;
	itmCll.setAttribute( "rowspan", 2 );
	itmRw.append( itmCll );
	itmCll1.innerHTML = evntDt;
	itmCll1.style.borderBottom = "black 2px solid";
	itmRw.append( itmCll1 );
	itmCll2.innerHTML = "&nbsp;&nbsp;&times;&nbsp;&nbsp;";
	itmCll2.setAttribute( "rowspan", 2);
	itmCll2.style.fontSize = "x-large";
	itmCll2.id = i;
	itmCll2.onclick = function() {
		sndRqst( hndlDlt, "POST", "api/delete?evntId=" + this.id );
	}	
	itmRw.append( itmCll2 );
	itmCll3.innerHTML = clcltDrtn( evntDt );
	[ itmCll, itmCll1, itmCll2, itmCll3].forEach( function(elmnt){
		elmnt.setAttribute( "align", "center" );
	});
	itmRw1.append( itmCll3 );
	itmCll3.style.color = "yellow";
	tBdy.append( itmRw );
	tBdy.append( itmRw1 );
	itmTbl.append( tBdy );
	rsltsElmnt.append( itmTbl );
}
	
function crtRmndrs( ) {
	if( asyncRqst.readyState == 4 && asyncRqst.status == 200 ) {
		while( rsltsElmnt.hasChildNodes() ) rsltsElmnt.removeChild( rsltsElmnt.firstChild );
		var rmndrs = asyncRqst.responseXML.getElementsByTagName( "rmndr");
		for( var i=0; i<rmndrs.length; i++ ) {
			addRmndrToDOM( i, rmndrs[i] );
		}
	}
}

function addRmndr( frmElmnt) {
	var itmCntnt = frmElmnt.itmCntnt.value, evntDt = frmElmnt.evntDt.value;

	if( frmValid )
		sndRqst( hndlDlt, "POST", "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt );
	else alert( "The form is invalid" );
}

function hndlDlt() {
	if( asyncRqst.readyState == 4 && asyncRqst.status == 200 ) {
		sndRqst( crtRmndrs, "GET", "api/get" );
	}
}

function vldtDt( self ) {
	var dtPrts = self.value.split("-"), slctdDt = new Date( parseInt(dtPrts[0]), parseInt(dtPrts[1])-1,
parseInt(dtPrts[2] ) );
	var mscndsPrDy = 1000 * 60 * 60 * 24, drtn = (slctdDt.getTime() - new Date().getTime() ) / mscndsPrDy;	

	console.log( "duration is ", drtn );
	if( drtn <= -1 ) {
		frmValid = false;
		document.getElementById( "dt-errr" ).style.display = "block";
	} else {
		frmValid = true;
		document.getElementById( "dt-errr" ).style.display = "none";
	}
}

sndRqst( crtRmndrs, "GET", "api/get" );

