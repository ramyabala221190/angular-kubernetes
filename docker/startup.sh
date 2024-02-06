#!/bin/bash
cp /usr/share/nginx/html/assets/json/config-${env}.json /usr/share/nginx/html/assets/json/config.json
cp /usr/share/nginx/html/assets/js/config-${env}.js /usr/share/nginx/html/assets/js/config.js
echo "Starting container. Runtime environment variables. target environment=${env}"
nginx -g 'daemon off;'