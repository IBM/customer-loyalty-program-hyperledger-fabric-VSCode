#!/bin/bash
#
#
# SPDX-License-Identifier: Apache-2.0
#

source ./stop.sh
cd test-network
source ./network.sh up createChannel -ca -s couchdb
source ./network.sh deployCC -ccn customerloyalty -ccp ../contract/ -ccl javascript
cd ../