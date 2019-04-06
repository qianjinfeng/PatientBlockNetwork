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
Do not need COMPOSER_PROVIDERS, use loopback user instead
   /usr/lib/node_modules/composer-rest-server/server/model-config.json
   "user": {
    "dataSource": "db",
    "public": true,
    "options": {
      "emailVerificationRequired": false
    }
  
composer-rest-server -c patientadmin@patient-network -a true -m true -w true -n never

Create a User 
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "realm": "test", \ 
   "username": "username", \ 
   "email": "username%40123.com", \ 
   "emailVerified": false, \ 
   "password": "password" \ 
 }' 'http://localhost:3000/api/users'

Log in 
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "username": "username", \ 
   "password": "password" \ 
 }' 'http://localhost:3000/api/users/login'

get the access code
{
  "id": "yHnPWpNYe0ZWUCAZ7gPs8Tw4VfdypFoUZSvwAnnVeuEqv5MO9JHtJAyqbYBMWkvh",
  "ttl": 1209600,
  "created": "2019-04-06T07:04:20.028Z",
  "userId": 1
}

Import business card
http://localhost:3000/api/wallet/import  

Access api
curl -v -H 'X-Access-Token: yHnPWpNYe0ZWUCAZ7gPs8Tw4VfdypFoUZSvwAnnVeuEqv5MO9JHtyqbYBMWkvh' http://localhost:3000/api/doctor

Import the business network card into the wallet by calling the POST /wallet/import 
navigate to the REST API explorer at http://localhost:3000/explorer/ call one of the business network REST API operations 

logout
curl -X POST http://localhost:3000/api/users/logout?access_token=yHnPWpNYe0ZWUCAZ7gPs8Tw4VfdypFoUZSvwAnnVeuEqv5MO9JHtJAyqbYBMWkvh

10.
in angular-app
npm install
npm start
http://localhost:4200


