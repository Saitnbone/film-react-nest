#!/bin/sh
until [ -f /usr/share/nginx/html/index.html ]; do
  echo "Waiting for frontend files..."
  sleep 1
done
echo "Frontend files found, starting nginx..."
exec nginx -g 'daemon off;'