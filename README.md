# Customer Loyalty Program with blockchain

A customer loyalty program allows companies to reward customers who frequently make purchases. Program members are able to earn points on purchases, which can translate into some type of reward such as discount, freebie or special customer treatment.  The members work toward a certain amount of points to redeem their reward.  These programs can have multiple companies as partners on the program, to cater to a customer base.  However, current loyalty program systems are restraint on relations between partners, and with visibility to members. These restraints can be removed by creating the customer loyalty program on a blockchain network.

This blockchain model for a customer loyalty program enhances the value of points to loyalty program members and brings in new value to the partners by creating trusted transactions. Participants in this network have a more level relation among each other and points are in the centric position to connect all participants.

In this code pattern, we will create a customer loyalty program as a blockchain web application using Hyperledger Fabric and Node.js. The application will allow members to register on the network where they will create their account.  They will be identified on the network with their account number and will create a access key which they will use to sign in.  This access key is used as the card id for the member to make transactions and query records.  The member once signed in, can make transactions to earn points and redeem points from the partners on the network. They can view their transactions as part of the blockchain ledger.  This code pattern illustrates the use of permissions as part of the network where a member can only view their transactions.

Similarly for the partner, they will register by creating an identity on the network and an access key which will be used to view their records.  Partners are allowed to view only transactions they were part of, and thus can keep track of all their transactions where they allocated or redeemed points.  The web application shows a basic dashboard for the partner displaying the total points that they have allocated and redeemed to members.  As transactions get complex, the partner can perform analysis on their transactions to create informative dashboards.

This code pattern is for developers looking to start building blockchain applications with Hyperledger Fabric and IBM Blockchain extension for VSCode. When the reader has completed this code pattern, they will understand how to:

* Setup a Hyperledger Fabric network on IBM Blockchain extension for VSCode.
* Install and instantiate smart contract through the IBM Blockchain extension on VSCode on a local fabric connection.
* Develop a Node.js web application with the Hyperledger Fabric SDK to interact with the deployed network


# Architecture Flow

<p align="center">
  <img src="docs/doc-images/arch-flow.png">
</p>

**Note** The blockchain network will have multiple members and partners

1. Member is registered on the network
2. Member can sign-in to make transactions to earn points, redeem points and view their transactions
3. Partner is registered on the network
4. Partner can sign-in to view their transactions and display dashboard


# Included Components

*	[IBM Blockchain Platform 2.0](https://console.bluemix.net/docs/services/blockchain/howto/ibp-v2-deploy-iks.html#ibp-v2-deploy-iks) gives you total control of your blockchain network with a user interface that can simplify and accelerate your journey to deploy and manage blockchain components on the IBM Cloud Kubernetes Service.
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) is designed to assist users in developing, testing, and deploying smart contracts -- including connecting to Hyperledger Fabric environments.

## Featured technology
+ [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io) is a platform for distributed ledger solutions, underpinned by a modular architecture that delivers high degrees of confidentiality, resiliency, flexibility, and scalability.
+ [Node.js](https://nodejs.org) is an open source, cross-platform JavaScript run-time environment that executes server-side JavaScript code.
+ [Express.js](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
+ [Bootstrap](https://getbootstrap.com/) Bootstrap is an open source toolkit for developing with HTML, CSS, and JS

## Running the application locally

Follow these steps to set up and run this code pattern. The steps are described in detail below.

### Prerequisites

You will need to follow the requirements for the [IBM Blockchain Platform Extension for VS Code](https://github.com/IBM-Blockchain/blockchain-vscode-extension/blob/master/README.md#requirements):

- [VSCode version 1.26 or greater](https://code.visualstudio.com)
- [Yeoman (yo) v2.x](http://yeoman.io/)
- [Docker version v17.06.2-ce or greater](https://www.docker.com/get-docker)
- [Docker Compose v1.14.0 or greater](https://docs.docker.com/compose/install/)

### Steps
1. [Clone the repo](#1-clone-the-repo)
2. [Package the smart contract](#2-package-the-smart-contract)
3. [Setup network locally and deploy the smart contract](#3-setup-network-locally-and-deploy-the-smart-contract)
4. [Run the application](#4-run-the-application)



## 1. Clone the repo

Clone this repository in a folder your choice:

```bash
git clone https://github.com/IBM/customer-loyalty-program-hyperledger-fabric-VSCode.git
cd customer-loyalty-program-hyperledger-fabric-VSCode
```


## 2. Package the smart contract

We will use the IBM Blockchain Platform extension to package the Fabcar smart contract.
* Open Visual Studio code and open the `contract` folder from this repository that was cloned earlier.

* Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package a Smart Contract Project`.

* Click the `IBM Blockchain Platform` extension button on the left. This will show the packaged contracts on top and the blockchain connections on the bottom.

* Next, right click on the packaged contract to export it and choose `Export Package`

* Choose a location on your machine and save `.cds` file.  We will use this packages smart contract later to deploy on our work.

<br>
<p align="center">
  <img src="docs/doc-gifs/package-smart-contract.gif">
</p>
<br>

## 3. Setup network locally and deploy the smart contract

* Click on the overflow menu for `LOCAL FABRIC OPS`, and choose `Start Fabric Runtime` to start a network. This will download the Docker images required for a local Fabric setup, and start the network. Once setup is complete, you should see under `LOCAL FABRIC OPS`, options to install and instantiate smart contract, your `Channels` information, your peer under `Nodes` and the organization msp under `Organizations`. You are now ready to install the smart contract.

* Click on `+Install` under `Installed` dropdown in the `LOCAL FABRIC OPS` console. Choose the peer: `peer0.org1.example.com`. Choose the `customerloyalty@1.0.0` contract. You should see a notification for successful install of the smart contract, and the smart contract listed under `Installed` in your `LOCAL FABRIC OPS` console. You are now ready to instantiate the smart contract.

* Click on `+Instantiate` under `Instantiated` dropdown in the `LOCAL FABRIC OPS` console. Choose the channel: `mychannel`. Choose the `customerloyalty@1.0.0` contract.  Type in `instantiate` for the function. You can press **Enter** for optional arguments.  Once this is successfully instantiated, you should see a successful notification in the output view, and the smart contract listed under `Instantiated` in your `LOCAL FABRIC OPS` console.


<br>
<p align="center">
  <img src="docs/doc-gifs/deploy-local.gif">
</p>
<br>


## 4. Run the application

* #### Enroll admin
  - First, navigate to the `web-app` directory, and install the node dependencies.
    ```bash
    cd web-app/
    npm install
    ```

  - Run the `enrollAdmin.js` script
    ```bash
    node enrollAdmin.js
    ```

  - You should see the following in the terminal:
    ```bash
    msg: Successfully enrolled admin user app-admin and imported it into the wallet
    ```

* #### Run the application server
  - From the `web-app` directory, start the server.

    ```bash
    npm start
    ```

You can find the app running at http://localhost:8000/

<br>
<p align="center">
  <img src="docs/doc-images/app.png">
</p>
<br>

## Links
* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [IBM Code Patterns for Blockchain](https://developer.ibm.com/patterns/category/blockchain/)

## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
