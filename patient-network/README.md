# patient-network

Business network definition
electrical health recorde for patients based on fabric network

1. create BND
composer archive create -t dir -n .

2. create PeerAdmin card for orgp1  in patient directory
composer card delete -c PeerAdmin@patient-network-orgp1
composer card create -p connection.json -u PeerAdmin -c Admin@orgp1.example.com-cert.pem -k f47c7adf8cb17a0e7f9f03ebefa984b5fd45b38bfe338681538c0ce592c92751_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@patient-network-orgp1.card

2. create PeerAdmin card for orgh1 in doctor directory
composer card delete -c PeerAdmin@patient-network-orgh1
composer card create -p connection.json -u PeerAdmin -c Admin@orgh1.example.com-cert.pem -k b0abc8655e982764a519b4d50cf780854b4e8dfde3548e8b1ff2fde6bdbeb896_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@patient-network-orgh1.card

3. import PeerAdmin card  in client directory
composer card import -f PeerAdmin@patient-network-orgp1.card --card PeerAdmin@patient-network-orgp1
composer card import -f PeerAdmin@patient-network-orgh1.card --card PeerAdmin@patient-network-orgh1


4. install network (install chaincode) in client directory
composer network install --card PeerAdmin@patient-network-orgp1 --archiveFile ../patient-network/patient-network@0.0.1.bna

4. install network on other peers 
composer network install --card PeerAdmin@patient-network-orgh1 --archiveFile ../patient-network/patient-network@0.0.1.bna

5. request two indentities - doctor, patient 
in patient directory
composer identity request -c PeerAdmin@patient-network-orgp1 -u admin -s adminpw -d patientadmin
in doctor directory
composer identity request -c PeerAdmin@patient-network-orgh1 -u admin -s adminpw -d doctoradmin


6. start, need administrators for business network  (instatiate chaincode, only by one PeerAdmin)   in client directory
composer network start --networkName patient-network --networkVersion 0.0.1  --card PeerAdmin@patient-network-orgp1 -A patientadmin -C ./patient/patientadmin/admin-pub.pem -A doctoradmin -C ./doctor/doctoradmin/admin-pub.pem

the created cards of network start is useless for multiple orgnization as connection inheritance is not right and private key is not included 
-o endorsementPolicyFile=endorsement-policy.json

7. create import admin card in patient directoy
composer card delete -c patientadmin@patient-network
composer card create -p connection.json -u patientadmin -n patient-network -c ./patientadmin/admin-pub.pem -k ./patientadmin/admin-priv.pem
composer card import -f patientadmin@patient-network.card

in doctory directory
composer card delete -c doctoradmin@patient-network
composer card create -p connection.json -u doctoradmin -n patient-network -c ./doctoradmin/admin-pub.pem -k ./doctoradmin/admin-priv.pem
composer card import -f doctoradmin@patient-network.card

8. ping admin card
composer network ping -c patientadmin@patient-network
composer network ping -c doctoradmin@patient-network

composer participant add -c patientadmin@patient-network -d '{"$class":"org.example.patientnewtork.Patient","patientId":"patient1", "name":"Joe","mobilePhone":"12344","city":"shanghai"}'

composer identity issue -c patientadmin@patient-network -f patient.card -u patient -a "resource:org.example.patientnewtork.Patient#patient1"
composer card import -f patient.card

composer participant add -c doctoradmin@patient-network -d '{"$class":"org.example.patientnewtork.Doctor","doctorId":"doctor1", "hospital":"10th hospital","name":"Alice","mobilePhone":"6743","city":"shanghai"}'

composer identity issue -c doctoradmin@patient-network -f radiologist.card -u radiologist -a "resource:org.example.patientnewtork.Doctor#doctor1"
composer card import -f radiologist.card

patient card is not have right to submit
composer transaction submit --card radiologist@patient-network -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry" : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.patientnewtork.MedicalRecord", "resources": [{"$class": "org.example.patientnewtork.MedicalRecord","recordId":"record1", "medicalReport":"OK for Stomach","creator":"resource:org.example.patientnewtork.Doctor#doctor1","owner":"resource:org.example.patientnewtork.Patient#patient1"}]}'

composer transaction submit --card radiologist@patient-network -d '{"$class":"org.example.patientnewtork.CreateRecord","aRecord":"resource:org.example.patientnewtork.MedicalRecord#record1","aDoctor":"resource:org.example.patientnewtork.Doctor#doctor1","aPatient":"resource:org.example.patientnewtork.Patient#patient1"}'


9. 
In patient-network directory, run composer-rest-server
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "4176f2d8c4ee52cc3652",
    "clientSecret": "f3bec3f834a5528e7934866202bac6643cd876fb",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'
composer-rest-server -c User1@orgp1.example.com@patient-network -a true -m true


 http://localhost:3000/auth/github
 -->  http://localhost:3000/explorer/

Import the business network card into the wallet by calling the POST /wallet/import 
navigate to the REST API explorer at http://localhost:3000/explorer/ call one of the business network REST API operations 


