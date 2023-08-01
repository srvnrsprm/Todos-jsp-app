/* HTMLElement.prototype.closest = function( srchTg ) {
  console.log( this );
  var prnt = this;
  while( prnt.nodeName.toLowerCase() != srchTg  ) {
    prnt = prnt.parentElement;
  }
  return prnt;
} */

HTMLElement.prototype.empty = function( ) {
  while( this.hasChildNodes() ) {
    this.removeChild( this.firstChild );
  }
  return this;
}

HTMLElement.prototype.fadeOut = function( duration ) {
  var self = this;
  
  var stIntrvl = setInterval( function( ) {
    //console.log( "fadeout --- set interval function called., self.opacity - ", self.style.opacity );
    if( self.style.opacity == "" ) self.style.opacity = 1;
    if( self.style.opacity == 0 ) {
      self.parentElement && self.parentElement.removeChild( self );
      clearInterval( stIntrvl );
      return;
    }
    self.style.opacity -= 0.1;
  }, duration/10 ); 
}

function myFetch( url, o ) {
  var xhr = new XMLHttpRequest();
  var mthd = ( o && o.mthd ) || "GET";
  var data = ( o && o.data ) || null;

  xhr.open( mthd, url, true );
  xhr.send( data );
  var promise = new Promise( function( resolve, reject ) {
    xhr.onload = function() {
      console.log( "xhr.onload, the ready state is " + xhr.readyState );
      if( xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
        resolve( xhr );
      } else {
        reject( new Error( xhr.status ) );
      }
    }
  });
  return promise;
}

