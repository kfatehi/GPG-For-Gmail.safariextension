var host = require('./host')
var openpgp = require('openpgp');

module.exports.decrypt = decrypt;

function decrypt(pgpMessage) {
  var key = host.getPrivateKey();
  var passphrase = host.getKeyPassphrase();
  var armor = openpgp.key.readArmored(host.getPrivateKey())
  var privateKey = openpgp.key.readArmored(key).keys[0];
  privateKey.decrypt(passphrase);
  pgpMessage = openpgp.message.readArmored(pgpMessage);
  return openpgp.decryptMessage(privateKey, pgpMessage)
}
