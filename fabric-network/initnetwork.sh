#!/bin/bash

# # Create the channel
# docker exec -e "CORE_PEER_LOCALMSPID=OrgP1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgp1.example.com/msp" peer0.orgp1.example.com peer channel create -o orderer.example.com:7050 -c patientchannel -f /etc/hyperledger/configtx/channel.tx --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem

# # Join peer0.orgh1.example.com to the channel.
# docker exec -e "CORE_PEER_LOCALMSPID=OrgH1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgh1.example.com/msp" peer0.orgh1.example.com peer channel join -b patientchannel.block --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem
# # Join peer0.orgh2.example.com to the channel.
# docker exec -e "CORE_PEER_LOCALMSPID=OrgH2MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgh2.example.com/msp" peer0.orgh2.example.com peer channel join -b patientchannel.block --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem
# # Join peer0.orgp1.example.com to the channel.
# docker exec -e "CORE_PEER_LOCALMSPID=OrgP1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgp1.example.com/msp" peer0.orgp1.example.com peer channel join -b patientchannel.block --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem
# # Join peer0.orgw.example.com to the channel.
# docker exec -e "CORE_PEER_LOCALMSPID=OrgWMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgw.example.com/msp" peer0.orgw.example.com peer channel join -b patientchannel.block --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem
# # Join peer1.orgw.example.com to the channel.
# docker exec -e "CORE_PEER_LOCALMSPID=OrgWMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/users/Admin@orgw.example.com/msp" peer1.orgw.example.com peer channel join -b patientchannel.block --tls true --cafile /etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem

docker exec cli channel-setup.sh patientchannel
if [ $? -ne 0 ]; then
    echo "ERROR !!!! failed to setup channel"
    exit 1
fi