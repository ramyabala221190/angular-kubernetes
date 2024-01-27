#!/bin/bash
#cp /usr/share/nginx/html/assets/${env}-config.js /usr/share/nginx/html/assets/config.js
echo "Starting container. Runtime env variables: env=${env} var1=${var1}"
nginx -g 'daemon off;'