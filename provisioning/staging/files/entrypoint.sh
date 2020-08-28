#!/bin/sh

echo "=============== STARTING WEBSITE (STAGING) ==================="
sudo --preserve-env=ENVIRONMENT \
  --preserve-env=VERSION \
  --preserve-env=BASE_URL \
  --preserve-env=API_URL \
  -u root runsvdir -P /etc/service