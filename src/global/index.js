var pgp = require('./pgp');

safari.application.addEventListener( "message", function( e ) {
  if( e.name === "getSettings" ) {
    e.target.page.dispatchMessage( "setSettings", {
      sort_keys: safari.extension.settings.getItem( "sort_keys" )
    } );
  }
}, false );
