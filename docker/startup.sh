#!/bin/bash
#cp /usr/share/nginx/html/assets/${env}-config.js /usr/share/nginx/html/assets/config.js
echo "Starting container. Runtime env variables: config=${config}"
nginx -g 'daemon off;'