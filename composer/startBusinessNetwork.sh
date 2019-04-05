#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# create PeerAdmin cards for install and instantiate chaincode
composer card delete -c PeerAdmin@patient-network-orgp1
sleep 3
composer card create -p ./patient/connection.json -u PeerAdmin -c ./patient/Admin@orgp1.example.com-cert.pem -k ./patient/f47c7adf8cb17a0e7f9f03ebefa984b5fd45b38bfe338681538c0ce592c92751_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@patient-network-orgp1.card
sleep 2
composer card import -f PeerAdmin@patient-network-orgp1.card --card PeerAdmin@patient-network-orgp1

composer card delete -c PeerAdmin@patient-network-orgh1
sleep 3
composer card create -p ./doctor/connection.json -u PeerAdmin -c ./doctor/Admin@orgh1.example.com-cert.pem -k ./doctor/b0abc8655e982764a519b4d50cf780854b4e8dfde3548e8b1ff2fde6bdbeb896_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@patient-network-orgh1.card
sleep 2
composer card import -f PeerAdmin@patient-network-orgh1.card --card PeerAdmin@patient-network-orgh1

#install chaincode, add npmrcfile to speed up network start
composer network install --card PeerAdmin@patient-network-orgp1 --archiveFile ../patient-network/patient-network@0.0.1.bna -o npmrcFile=./npmConfig
sleep 5
composer network install --card PeerAdmin@patient-network-orgh1 --archiveFile ../patient-network/patient-network@0.0.1.bna -o npmrcFile=./npmConfig

# create identities for administrators of the business network
sleep 3
composer identity request -c PeerAdmin@patient-network-orgp1 -u admin -s adminpw -d patientadmin
sleep 3
composer identity request -c PeerAdmin@patient-network-orgh1 -u admin -s adminpw -d doctoradmin

# start the business network, instantiate chaincode
sleep 3
composer network start --networkName patient-network --networkVersion 0.0.1  --card PeerAdmin@patient-network-orgp1 -A patientadmin -C ./patientadmin/admin-pub.pem -A doctoradmin -C ./doctoradmin/admin-pub.pem

