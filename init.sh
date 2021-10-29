#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Starting Service ..."
VERBOSE=1 yarn start:server
