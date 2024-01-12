#!/bin/bash
echo "Starting container. Runtime env variables: env=${env}"
nginx -g 'daemon off;'