# PatientBlockNetwork
Patient data on BlockNetwork

1. generate.sh  run only once.  generate gensis, channel blocks; crypto artifacts.
2. start.sh     run docker containers
3. monitordocker.sh     monitor logs of containders at the same network
4. initnetwork.sh       create channel, install chaincode, instatiante chaincode
    4.1 channel-setup.sh
5. stop.sh      stop docker containers
6. teardown.sh  remove intermediate docker images
