#!/bin/bash
cp /usr/share/nginx/html/assets/json/config-${env}.json /usr/share/nginx/html/assets/json/config.json
echo "Starting container. Runtime environment variables.
1) environment from kube config file=${env} 2) environment from dockerfile=${dockerEnv}"
nginx -g 'daemon off;'