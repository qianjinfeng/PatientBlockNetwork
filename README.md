# PatientBlockNetwork
Patient data on BlockNetwork

1. generate.sh  run only once.  generate gensis, channel blocks; crypto artifacts.
2. start.sh     run docker containers
     create channel, install chaincode, instatiante chaincode
       channel-setup.sh
3. monitordocker.sh     monitor logs of containders at the same network

in composer directory
startBusinessNetwork.sh
setupBusinessNetwork.sh

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
composer-rest-server -c patientadmin@patient-network -n never -a true -m true -w true



5. stop.sh      stop docker containers
6. teardown.sh  remove intermediate docker images






