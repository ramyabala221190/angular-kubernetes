#!/bin/bash
cp /usr/share/nginx/html/assets/config-${env}.json /usr/share/nginx/html/assets/config.json
echo "Starting container. Runtime env variables: env=${env} var1=${var1}"
nginx -g 'daemon off;'