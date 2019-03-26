# patient-network

Business network definition
electrical health recorde for patients based on fabric network

1. create BND
composer archive create -t dir -n .

2. create PeerAdmin card
composer card delete -c PeerAdmin@patient-network-orgp1
composer card create -p connection.json -u PeerAdmin -c Admin@orgp1.example.com-cert.pem -k f47c7adf8cb17a0e7f9f03ebefa984b5fd45b38bfe338681538c0ce592c92751_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@patient-network-orgp1.card

3. import PeerAdmin card
composer card import -f PeerAdmin@patient-network-orgp1.card --card PeerAdmin@patient-network-orgp1


4. install network (install chaincode)
composer network install --card PeerAdmin@patient-network-orgp1 --archiveFile ../../patient-network/patient-network@0.0.1.bna

4. install network on other peers 

5. start, need administrators for business network  (instatiate chaincode)
composer network start --networkName patient-network --networkVersion 0.0.1 -A User1@orgp1.example.com -C User1@orgp1.example.com-cert.pem -K 23f592f857b0cc53a43aad48190d1abe825576564aebd3cf3ffa2e3355bc80f8_sk --card PeerAdmin@patient-network-orgp1 --file Admin@patient-network-orgp1.card -o endorsementPolicyFile=endorsement-policy.json

6. import admin card
composer card delete -c Admin@patient-network-orgp1.card
composer card import -f Admin@patient-network-orgp1.card

7. ping admin card
composer network ping -c Admin@patient-network-orgp1.card



