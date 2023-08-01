var asyncRqst, rsltsElmnt = document.getElementById( "rslts" ), xsl;
var notifyElmnt = document.getElementsByClassName( "notify" )[0];

function hndlSave() {
  console.log( "hndlSave event listener is called" );
  this.removeEventListener( "click", hndlSave );
  var txtAreaPrnt = this.closest( "tr" ).previousElementSibling.firstChild;
  //sndRqst( loadRmndrs, "POST", "api/update?itmCntnt=" + txtAreaPrnt.firstChild.value + "&evntId=" + this.getAttribute( "data-id" ) );
  myFetch( "api/update?itmCntnt=" + txtAreaPrnt.firstChild.value + "&evntId=" + this.getAttribute( "data-id" ), { mthd : "POST" } ).then ( loadRmndrs, function( err ) {
    alert( "Error in processing the update request, " + err );
  });
  //$( this ).attr( "src", "assets/imgs/pencil.svg" );
  this.setAttribute( "src", "assets/imgs/pencil.svg" );
  this.addEventListener( "click", hndlEdit );
}

function hndlEdit() {
  console.log( "hndlEdit event listener is called" );
  this.closest( "tr" ).previousElementSibling.firstChild.innerHTML = "<textarea rows=3 columns=50 style='width:100%;'>" + this.closest( "tr" ).previousElementSibling.firstChild.innerText + "</textarea>";
  this.setAttribute( "src", "assets/imgs/check.svg" );
  this.removeEventListener( "click", hndlEdit );
  this.addEventListener( "click", hndlSave );
}

var edits = document.getElementsByClassName( "edit" );
for( var i=0; i<edits.length; i++ )
  edits[i].addEventListener( "click", hndlEdit );

function sndRqst( cllbckFn, mthd, url ) {
  asyncRqst = new XMLHttpRequest();
  asyncRqst.onreadystatechange = cllbckFn;
  asyncRqst.open( mthd, url, true );
  asyncRqst.send( null );
}

function addRmndr( frmElmnt) {
  var itmCntnt = frmElmnt.itmCntnt.value, evntDt = frmElmnt.evntDt.value;

  if( itmCntnt && vldtDt( evntDt ) ) 
    myFetch( "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt, { mthd : "POST" } ).then( loadRmndrs, function( err ) {
      alert( "Error in processing the request, " + err );
  }); 
  //sndRqst( loadRmndrsPostOps, "POST", "api/add?itmCntnt=" + itmCntnt + "&evntDt=" + evntDt );
}

function dltRmndr( id ) {
  //console.log( "dltRmndr function called" );
  //sndRqst( loadRmndrsPostOps, "POST", "api/delete?evntId=" + id );
  myFetch( "api/delete?evntId=" + id , { mthd : "POST" } ).then ( loadRmndrs, function( err ) {
    alert( "Error in processing the request, " + err );
  });
}

//[TODO]: raw xmlhttp request sends need to be deleted after implementing custom fetch ops.
/* sndRqst( function( ) {
  if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
    alert( "Error in processing the request, " + asyncRqst.status );
  } else if( asyncRqst.readyState == 4 ) {
    xsl = asyncRqst.responseXML;
    loadRmndrs();
  }    
} , "GET", "assets/reminders.xsl" );  */

myFetch( "assets/reminders.xsl" ).then( function( xhr ) {
  xsl = xhr.responseXML;
  loadRmndrs();
}, function( err ) {
  alert( "Error in processsing the request, " + err );
});

function dltNotifyRow( elmnt, duration ) {
  if( duration ) {
    elmnt.closest( "table" ).fadeOut( duration );
  } else {
    elmnt.closest( "table" ).fadeOut( 5000 );
  }
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

function loadRmndrs() {
  myFetch( "api/get" ). then( function( xhr ) {
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet( xsl );
    var result = xsltProcessor.transformToFragment( xhr.responseXML, document );
    rsltsElmnt.empty();
    rsltsElmnt.appendChild( result );
    var ntfyStrng = "<table><colgroup><col width=90%><col width=10%></colgroup><tr><td>" + xhr.status + "</td><td onClick='dltNotifyRow(this)'>&times;</td></tr></table>";
    var doc = createElementFromHTML( ntfyStrng );
    dltNotifyRow( doc, 30000 );
    notifyElmnt.appendChild( doc );
    var edits = document.getElementsByClassName( "edit" );
    for( var i=0; i<edits.length; i++ )
      edits[i].addEventListener( "click", hndlEdit );
  }, function( err ) {
    alert( "Error in processing the request - " + err );
  });
}

//[TODO]: raw xmlhttprequest sends need to be eliminated after implementing custom fetch
/*function loadRmndrs() {
  sndRqst( function() {
    if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
      alert( "Error in processing the request, " + asyncRqst.status );
    } else if( asyncRqst.readyState == 4 ) {
      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet( xsl );
      var result = xsltProcessor.transformToFragment( asyncRqst.responseXML, document ); 
      rsltsElmnt.empty();
      rsltsElmnt.appendChild( result );
      var txtContent = asyncRqst.status //+ ", " + asyncRqst.responseText.substring( 0, 20 ) || "Ok";
      //notifyElmnt.innerHTML += "<table><colgroup><col width=90%><col width=10%></colgroup><tr><td>" + txtContent + "</td><td onClick='dltNotifyRow(this)'>&times;</td></tr></table>";
      var ntfyStrng = "<table><colgroup><col width=90%><col width=10%></colgroup><tr><td>" + txtContent + "</td><td onClick='dltNotifyRow(this)'>&times;</td></tr></table>";
      //var doc = new DOMParser().parseFromString( ntfyStrng, "text/html" );
      var doc = createElementFromHTML( ntfyStrng );
      console.log( doc );
      dltNotifyRow( doc, 30000 );
      notifyElmnt.appendChild( doc );
      var edits = document.getElementsByClassName( "edit" );
        for( var i=0; i<edits.length; i++ )
           edits[i].addEventListener( "click", hndlEdit );
    }
  }, "GET", "api/get" ); 
} */

function loadRmndrsPostOps() {
  if( asyncRqst.readyState == 4 && asyncRqst.status != 200 ) {
    alert( "Error in processing the request, " + asyncRqst.status );
  } else if( asyncRqst.readyState == 4 ) {
    loadRmndrs();
  }
}

function vldtDt( inptDt ) {
  var dtPrts = (inptDt.indexOf( '/' ) != -1)?inptDt.split("/"):inptDt.split( "-" ), slctdDt = new Date( parseInt(dtPrts[2]), parseInt(dtPrts[0])-1, parseInt(dtPrts[1] ) );
  var mscndsPrDy = 1000 * 60 * 60 * 24, drtn = (slctdDt.getTime() - new Date().getTime() ) / mscndsPrDy;  

  console.log( dtPrts );
  if( drtn <= -1 ) {
    //$( "#dt-errr" ).dialog( { title : "Invalid date" } );
    alert( "Invalid date, select a future date" );
    return false;
  } 
  return true;
}

