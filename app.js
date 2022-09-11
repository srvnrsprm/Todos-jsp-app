var rsltsElmnt = document.getElementById( "rslts" );
var asyncRqst, $ = document.createElement.bind(document);

function sndRqst( cllbckFn, mthd, url ) {
	asyncRqst = new XMLHttpRequest();
	asyncRqst.onreadystatechange = cllbckFn;
	asyncRqst.open( mthd, url, true );
	asyncRqst.send( null );
}

function addRmndr( frmElmnt) {
	var itmCntnt = frmElmnt.itmCntnt.value, evntDt = frmElmnt.evntDt.value;

	if( itmCntnt && vldtDt(frmElmnt.evntDt.value) )
		sndRqst( hndlDlt, "POST", "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt );
	else alert( "The form is invalid" );
}

function dltRmndr( id ) {
	sndRqst( hndlDlt, "POST", "api/delete?evntId=" + id );
}

function hndlDlt() {
	if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
		alert( "Error in processing the request, " + asyncRqst.status );
	} else if( asyncRqst.readyState == 4 ) {
		location.href = "hmPg";
	}
}

function vldtDt( inptDt ) {
	var dtPrts = inptDt.split("-"), slctdDt = new Date( parseInt(dtPrts[0]), parseInt(dtPrts[1])-1,
parseInt(dtPrts[2] ) );
	var mscndsPrDy = 1000 * 60 * 60 * 24, drtn = (slctdDt.getTime() - new Date().getTime() ) / mscndsPrDy;	

	if( drtn <= -1 ) {
		document.getElementById( "dt-errr" ).style.display = "block";
		return false;
	} else {
		document.getElementById( "dt-errr" ).style.display = "none";
		return true;
	}
}
