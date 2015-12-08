module.exports.getPrivateKey = function() {
  console.log(safari.extension)
  console.log(safari.extension.settings)
  console.log(safari.extension.settings.bullshit)
  console.log(safari.extension.secureSettings)
  return safari.extension.secureSettings.privateKey
}

module.exports.getKeyPassphrase = function() {
  return safari.extension.secureSettings.keyPassphrase
}
