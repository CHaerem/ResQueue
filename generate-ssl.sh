#!/bin/sh

# Create the certs directory if it doesn't exist
mkdir -p ./certs

# Generate SSL keys
openssl req -x509 -newkey rsa:4096 -keyout ./certs/localhost-key.pem -out ./certs/localhost.pem -days 365 -nodes -subj "/CN=localhost"
