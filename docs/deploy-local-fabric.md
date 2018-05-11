# Deploy network to Fabric locally

In this section we will:
* [Setup Hyperledger Fabric locally](#setup-hyperledger-fabric-locally)
* [Deploy network to Hyperledger Fabric instance](#deploy-network-to-hyperledger-fabric-instance)

## Setup Hyperledger Fabric Locally

**Note** The following steps to setup fabric instance follow the guide [Installing the development environment](https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial) for Hyperledger Composer.


Prior to starting, would recommend removing all running containers, and all previously created Hyperledger Fabric chaincode images:

```none
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

This command will remove all composer cards
```
rm -rf ~/.composer
```

The fabric setup scripts will be in the `/fabric-dev-servers` directory. Start fabric and create peer admin card:

```
cd fabric-dev-servers/
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

## Deploy network to Hyperledger Fabric instance

**Note** The following steps to deploy to fabric instance follow the guide [Developer Tutorial](https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial) for Hyperledger Composer.


Now, we are ready to deploy the business network to Hyperledger Fabric. This requires the Hyperledger Composer chaincode to be installed on the peer,then the business network archive (.bna) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

* First, install the business network:

```
cd ../
composer network install --card PeerAdmin@hlfv1 --archiveFile clp-network@0.0.1.bna
```

* Start the business network:

```
composer network start --networkName clp-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

* Import the network administrator identity as a usable business network card:
```
composer card import --file networkadmin.card
```

* Check that the business network has been deployed successfully, run the following command to ping the network:
```
composer network ping --card admin@clp-network
```


If the command returns successfully, your setup is complete.

Your ready to [run the application](../README.md#5-run-application).


At the end of your session, you can stop fabric:

```
cd ~/fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh
```
