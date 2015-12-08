# GPGMail

Safari extension that adds GPG capabilities to Gmail

## Adding your Key

Safari extensions are not allowed to access the hard disk, so you must provide your key manually.

Add your key and passphrase in Preferences > Extensions > GPGmail

You can get your key into your clipboard with this command

    gpg --export-secret-key -a "Keyvan Fatehi" | pbcopy

## Decrypting Emails

Go to Gmail and you'll notice a new "Decrypt" button. Use that on any PGP message your private key can decipher.
