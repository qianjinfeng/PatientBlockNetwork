# PatientBlockNetwork

Patient data on a Decentralized network. The data is created by Hospitals and owned by Patients. Patients can grant the access to data for other 3rd parties. 

The data is stored in a patient channel. Hospitals and 3rd praties can join the channel to access it. 


# Running the Application

*  generate.sh  
  run only once.  generate gensis, channel blocks; crypto artifacts.

* start.sh     
  run docker containers
     create channel, 
       channel-setup.sh
       
* monitordocker.sh     
  monitor logs of containders at the same network

* composer archive create -t dir -n .
  create business network definition in patient-network

* startBusinessNetwork.sh 
  run in composer directory to install chaincode, instatiante chaincode

* setupBusinessNetwork.sh 
  to create business card and setup several participants and identities

* composer-rest-server -c patientadmin@patient-network -n never -w true 
  start a REST server

* npm install and npm start  
  in patient-network/angular-app
  angular front to interact with REST server

* stop.sh      
  stop docker containers

* teardown.sh  
  remove intermediate docker images






