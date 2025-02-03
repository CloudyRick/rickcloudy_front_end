#!/bin/sh

echo "Injecting runtime environment variables..."

# Replace placeholders in config.js with actual environment variables
sed -i "s|http://localhost:8080/api|${VITE_BASE_API_URL}|g" /usr/share/nginx/html/config.js

exec "$@"
