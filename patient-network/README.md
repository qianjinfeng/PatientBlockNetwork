# patient-network

Business network definition
electrical health recorde for patients based on fabric network

1. create BND
composer archive create -t dir -n .

startBusinessNetwork.sh
setupBusinessNetwork.sh

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
composer-rest-server -c patientadmin@patient-network -a true -m true -w true


 http://localhost:3000/auth/github
 -->  http://localhost:3000/explorer/

Import the business network card into the wallet by calling the POST /wallet/import 
navigate to the REST API explorer at http://localhost:3000/explorer/ call one of the business network REST API operations 

10.
in angular-app
npm install
npm start
http://localhost:4200


