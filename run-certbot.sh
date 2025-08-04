#!/bin/sh
set -e

echo "Attempting certificate acquisition using manual DNS challenge..."

# Run certonly in manual mode, requesting DNS challenge
certbot certonly \
    --authenticator manual \
    --preferred-challenges dns \
    --email valeria.kruk921@gmail.com \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size 4096 \
    --manual-public-ip-logging-ok \
    -d idonotlikedocker.com \
    -d www.idonotlikedocker.com

echo "Certbot manual command finished." 