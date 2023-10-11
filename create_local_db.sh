#!/bin/bash

# Create a PostgreSQL database for local development
psql -U postgres -c "CREATE DATABASE resqueue_dev;"
psql -U postgres -c "CREATE USER resqueue_dev WITH PASSWORD 'DEV_DB_PASSWORD';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE resqueue_dev TO resqueue_dev;"
