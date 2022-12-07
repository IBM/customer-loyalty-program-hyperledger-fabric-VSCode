#!/bin/bash
#
#
# SPDX-License-Identifier: Apache-2.0
#

cd test-network
source ./network.sh up createChannel -ca -s couchdb
source ./network.sh deployCC -ccn customerloyalty -ccp ../contract/ -ccl javascript
cd ../