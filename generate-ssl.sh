#!/bin/sh
openssl req -x509 -newkey rsa:4096 -keyout ./certs/localhost-key.pem -out ./certs/localhost.pem -days 365 -nodes -subj "/CN=localhost"
