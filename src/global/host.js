// gpg --export-secret-key -a "Keyvan Fatehi" | openssl base64 | pbcopy
module.exports.getPrivateKey = function() {
  var base64Key = safari.extension.secureSettings.privateKey
  return atob(base64Key);
}

module.exports.getKeyPassphrase = function() {
  return safari.extension.secureSettings.keyPassphrase
}
