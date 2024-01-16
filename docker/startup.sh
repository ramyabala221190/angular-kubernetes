#!/bin/bash
echo "Starting container. Runtime env variables: var1=${var1}  var2=${var2}"
nginx -g 'daemon off;'