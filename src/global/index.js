var pgp = require('./pgp');

function respondToMessage(event) {
  if (event.name == "decrypt") {
    var reply = function(value) {
      var res = JSON.stringify(value);
      event.target.page.dispatchMessage("decryptedMessage", res);
    }
    pgp.decrypt(event.message).then(function(value) {
      reply({ plaintext: value })
    }).catch(function(err) {
      reply({ error: err.message })
    });
  } 

}

safari.application.addEventListener("message", respondToMessage, false);
