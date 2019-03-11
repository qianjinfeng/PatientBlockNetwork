#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
CHANNEL_NAME="$1"
CORE_PEER_TLS_ENABLED=true
ORDERER_CA=/etc/hyperledger/fabric/orderer/msp/tlscacerts/tlsca.example.com-cert.pem

# Channel creation
echo "========== Creating channel: "$CHANNEL_NAME" =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgp1/users/Admin@orgp1.example.com/msp
export CORE_PEER_ADDRESS=peer0.orgp1.example.com:7051
export CORE_PEER_LOCALMSPID="OrgP1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgp1/peers/peer0.orgp1.example.com/tls/ca.crt
peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f /etc/hyperledger/configtx/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA


# peer0.orgp1 channel join
echo "========== Joining peer0.orgp1.example.com to channel mychannel =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgp1/users/Admin@orgp1.example.com/msp
export CORE_PEER_ADDRESS=peer0.orgp1.example.com:7051
export CORE_PEER_LOCALMSPID="OrgP1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgp1/peers/peer0.orgp1.example.com/tls/ca.crt
peer channel join -b ${CHANNEL_NAME}.block
peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f /etc/hyperledger/configtx/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA


# peer0.orgh1 channel join
echo "========== Joining peer0.orgh1.example.com to channel mychannel =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgh1/users/Admin@orgh1.example.com/msp
export CORE_PEER_ADDRESS=peer0.orgh1.example.com:7051
export CORE_PEER_LOCALMSPID="OrgH1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgh1/peers/peer0.orgh1.example.com/tls/ca.crt
peer channel join -b ${CHANNEL_NAME}.block
peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f /etc/hyperledger/configtx/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA


# peer0.orgh2 channel join
echo "========== Joining peer0.orgh2.example.com to channel mychannel =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgh2/users/Admin@orgh2.example.com/msp
export CORE_PEER_ADDRESS=peer0.orgh2.example.com:7051
export CORE_PEER_LOCALMSPID="OrgH2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgh2/peers/peer0.orgh2.example.com/tls/ca.crt
peer channel join -b ${CHANNEL_NAME}.block
peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f /etc/hyperledger/configtx/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA


# peer0.orgw channel join
echo "========== Joining peer0.orgw.example.com to channel mychannel =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgw/users/Admin@orgw.example.com/msp
export CORE_PEER_ADDRESS=peer0.orgw.example.com:7051
export CORE_PEER_LOCALMSPID="OrgWMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgw/peers/peer0.orgw.example.com/tls/ca.crt
peer channel join -b ${CHANNEL_NAME}.block
peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f /etc/hyperledger/configtx/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA


# peer1.orgw channel join
echo "========== Joining peer1.orgw.example.com to channel mychannel =========="
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/orgw/users/Admin@orgw.example.com/msp
export CORE_PEER_ADDRESS=peer1.orgw.example.com:7051
export CORE_PEER_LOCALMSPID="OrgWMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/orgw/peers/peer1.orgw.example.com/tls/ca.crt
peer channel join -b ${CHANNEL_NAME}.block
