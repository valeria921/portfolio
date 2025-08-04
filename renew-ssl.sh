#!/bin/bash

# SSL Certificate Renewal Script
# This script renews SSL certificates using DNS challenge

cd /root/portfolio

# Check if certificates need renewal (only renew if they expire within 30 days)
if docker compose --env-file backend/.env.prod run --rm certbot certificates | grep -q "VALID: 30 days"; then
    echo "$(date): Certificates are still valid for more than 30 days, skipping renewal"
    exit 0
fi

echo "$(date): Starting SSL certificate renewal..."

# Renew certificates using DNS challenge
docker compose --env-file backend/.env.prod run --rm certbot certonly \
    --authenticator manual \
    --preferred-challenges dns \
    --email valeria.kruk921@gmail.com \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size 4096 \
    -d idonotlikedocker.com \
    -d www.idonotlikedocker.com \
    --force-renewal

# Check if renewal was successful
if [ $? -eq 0 ]; then
    echo "$(date): SSL certificates renewed successfully"
    
    # Restart backend to use new certificates
    docker compose --env-file backend/.env.prod restart backend
    echo "$(date): Backend restarted with new certificates"
else
    echo "$(date): SSL certificate renewal failed"
    exit 1
fi 