var _ = require('lodash');
var Promise = require('bluebird');
var $ = require('jquery')
var gmail = require('./gmail')($)
var bodyParser = require('./body-parser');

var target = document.querySelector('head > title');
var observer = new window.WebKitMutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    addButton();
  });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });


var key;

function keyChanged(event) {
  console.log(event);
  if (event.key == "privateKey") {
    key = event.newValue;
    console.log('keychange!!!', key);
  }
}

safari.extension.secureSettings.addEventListener("change", keyChanged, false);


function addButton() {
  gmail.tools.add_toolbar_button("Decrypt", function() {
    var email = $(gmail.dom.email_contents())
    var cryptoBlocks = getCryptoBlocks(email);
    decrypt(cryptoBlocks, email);
  });
}

function getCryptoBlocks(emailElement) {
  var data = emailElement.text()
  var pgpBlocks = bodyParser.extractPGP(data)
  return pgpBlocks.length > 0 ? pgpBlocks : null
}

function decrypt(pgpBlocks, emailElement) {
  return Promise.map(pgpBlocks, function(pgpMessage) {
    console.log('found pgp message and trying to decrypt');
    return pgp.decrypt(pgpMessage).catch(function(err) {
      console.log('failed ot decrypt, err', err);
      showModal('Cannot decrypt!', 'Either you do not have the key, or your passphrase is wrong, or the message is corrupt.', function(){})
    });
  }).then(function(plaintexts) {
    console.log('decrypted, got plains', plaintexts);
    var plaintexts = plaintexts.join('\n---\n')
    emailElement.empty()
    _.each(plaintexts, function(plaintext) {
      var html = plaintext.split('\n').join('<br>')
      emailElement.append(html);
    });
  });
}

function showModal(title, body, cb) {
  gmail.tools.add_modal_window(title, body, cb);
}
