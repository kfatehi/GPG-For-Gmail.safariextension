var Promise = require('bluebird');
module.exports.decrypt = decryptRemotely;

// all this does is message the ciphertext to the secure area
// and get back the plaintext. this is to avoid bringing the
// user's gpg key into the active webpage
// returns a promise
function decryptRemotely(pgpMessage) {
  return new Promise(function(resolve, reject) {
    function getMessage(msgEvent) {
      if (msgEvent.name == "decryptedMessage") {
        var res = JSON.parse(msgEvent.message);
        if (res.error)
          reject(res.error);
        else
          resolve(res.plaintext)
      }
    }
    safari.self.addEventListener("message", getMessage, false); // wait for reply
    safari.self.tab.dispatchMessage("decrypt", pgpMessage); // ask for value
  });
}
