#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

export IMAGE_TAG=latest

docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up -d 

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
sleep ${FABRIC_START_TIMEOUT}

docker exec cli /bin/bash ./script/channel-setup.sh

if [ $? -ne 0 ]; then
    echo "ERROR !!!! failed to setup channel"
    exit 1
fi