#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# create admin card for the business network
composer card delete -c patientadmin@patient-network
sleep 3
composer card create -p ./patient/connection.json -u patientadmin -n patient-network -c ./patientadmin/admin-pub.pem -k ./patientadmin/admin-priv.pem
sleep 2
composer card import -f patientadmin@patient-network.card
composer network ping -c patientadmin@patient-network

composer card delete -c doctoradmin@patient-network
sleep 3
composer card create -p ./doctor/connection.json -u doctoradmin -n patient-network -c ./doctoradmin/admin-pub.pem -k ./doctoradmin/admin-priv.pem
sleep 2
composer card import -f doctoradmin@patient-network.card
composer network ping -c doctoradmin@patient-network

# add one patient participant
sleep 3
composer participant add -c patientadmin@patient-network -d '{"$class":"org.example.patientnewtork.Patient","patientId":"patient1", "name":"Joe","mobilePhone":"12344","city":"shanghai"}'
# add on doctor participant
sleep 3
composer participant add -c doctoradmin@patient-network -d '{"$class":"org.example.patientnewtork.Doctor","doctorId":"doctor1", "hospital":"10th hospital","name":"Alice","mobilePhone":"6743","city":"shanghai"}'

# create identities for the business work
composer card delete -c patient@patient-network
sleep 3
composer identity issue -c patientadmin@patient-network -f patient.card -u patient -a "resource:org.example.patientnewtork.Patient#patient1"
sleep 2
composer card import -f patient.card

composer card delete -c radiologist@patient-network
sleep 3
composer identity issue -c doctoradmin@patient-network -f radiologist.card -u radiologist -a "resource:org.example.patientnewtork.Doctor#doctor1"
sleep 2
composer card import -f radiologist.card

#create a asset by a identity 
sleep 5
composer transaction submit --card radiologist@patient-network -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry" : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.patientnewtork.MedicalRecord", "resources": [{"$class": "org.example.patientnewtork.MedicalRecord","recordId":"record1", "medicalReport":"OK for Stomach","creator":"resource:org.example.patientnewtork.Doctor#doctor1","owner":"resource:org.example.patientnewtork.Patient#patient1"}]}'