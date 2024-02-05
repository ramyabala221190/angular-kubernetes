#!/bin/bash
#cp /usr/share/nginx/html/assets/json/config-${env}.json /usr/share/nginx/html/assets/json/config.json
# cat /usr/share/nginx/html/assets/js/config-${env}.js
cp /usr/share/nginx/html/assets/js/config-${env}.js /usr/share/nginx/html/assets/js/config.js
echo "Starting container. Runtime env variables: env=${env} var1=${var1}"
nginx -g 'daemon off;'