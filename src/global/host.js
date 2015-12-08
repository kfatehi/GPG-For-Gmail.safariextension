// gpg --export-secret-key -a "Keyvan Fatehi" | pbcopy
module.exports.getPrivateKey = function() {
  // safari doesnt give us multiline string in settings
  // it turns every newline into a space
  // so we have to fudge around to recreate this thing
  var raw = safari.extension.secureSettings.privateKey;
  var version = raw.match(/GnuPG v(\d+)/)[1];
  var body = raw.match(/  (.+) -----END/)[1].replace(/ /g, '\n')
  var lines = [];
  lines.push('-----BEGIN PGP PRIVATE KEY BLOCK-----')
  lines.push('Version: GnuPG v'+version);
  lines.push('');
  lines.push(body);
  lines.push('-----END PGP PRIVATE KEY BLOCK-----');
  var result = lines.join('\n');
  console.log(result);
  return result;
}

module.exports.getKeyPassphrase = function() {
  return safari.extension.secureSettings.keyPassphrase
}
