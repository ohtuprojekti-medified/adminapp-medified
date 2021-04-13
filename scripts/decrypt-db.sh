#!/bin/bash

echo "Decrypt database"
gpg --quiet --batch --yes --decrypt --passphrase="$DB_GPG_PASSWORD" \
--output ./latest-staging-anon-extreme.sql ./latest-staging-anon-extreme.sql.gpg