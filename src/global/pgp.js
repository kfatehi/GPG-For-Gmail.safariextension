var host = require('./host')
var openpgp = require('openpgp');

module.exports.decrypt = decrypt;

function decrypt(pgpMessage) {
  var armor = openpgp.key.readArmored(host.getPrivateKey())
  var privateKey = openpgp.key.readArmored(key).keys[0];
  privateKey.decrypt(host.getKeyPassphrase());
  pgpMessage = openpgp.message.readArmored(pgpMessage);
  return openpgp.decryptMessage(privateKey, pgpMessage)
}
