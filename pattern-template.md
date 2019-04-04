# Short title

Customer Loyalty Program with blockchain

# Long title

Use Hyperledger Fabric V1.4, IBM Blockchain 2.0, and Node.js to create the blockchain web app and network

# Author

* Ashutosh Nath Agarwal <ashutosh.nath.agarwal@ibm.com>
* Raheel Zubairy <raheel.zubairy@ibm.com>

# URLs

### Github repo

* https://github.com/ash7594/customer-loyalty-program

# Summary

This code pattern is for developers looking to start building blockchain applications with Hyperledger Fabric and IBM Blockchain extension for VSCode. Learn how to set up a Hyperledger Fabric customer rewards program network on a local Fabric network, install and instantiate a smart contract through IBM Blockchain extension for VSCode, and develop a Node.js web application with the Hyperledger Fabric SDK to interact with the deployed network.

# Technologies

+ [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io) is a platform for distributed ledger solutions, underpinned by a modular architecture that delivers high degrees of confidentiality, resiliency, flexibility, and scalability.
+ [Node.js](https://nodejs.org) is an open source, cross-platform JavaScript run-time environment that executes server-side JavaScript code.
+ [Express.js](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
+ [Bootstrap](https://getbootstrap.com/) Bootstrap is an open source toolkit for developing with HTML, CSS, and JS

# Description

A customer loyalty program allows companies to reward customers who frequently make purchases. Program members are able to earn points on purchases, which can translate into some type of reward such as discount, freebie or special customer treatment.  The members work toward a certain amount of points to redeem their reward.  These programs can have multiple companies as partners on the program, to cater to a customer base.  However, current loyalty program systems are restraint on relations between partners, and with visibility to members. These restraints can be removed by creating the customer loyalty program on a blockchain network.

This blockchain model for a customer loyalty program enhances the value of points to loyalty program members and brings in new value to the partners by creating trusted transactions. Participants in this network have a more level relation among each other and points are in the centric position to connect all participants.

In this code pattern, we will create a customer loyalty program as a blockchain web application using Hyperledger Fabric and Node.js. The application will allow members to register on the network where they will create their account.  They will be identified on the network with their account number and will create a access key which they will use to sign in.  This access key is used as the card id for the member to make transactions and query records.  The member once signed in, can make transactions to earn points and redeem points from the partners on the network. They can view their transactions as part of the blockchain ledger.  This code pattern illustrates the use of permissions as part of the network where a member can only view their transactions.

Similarly for the partner, they will register by creating an identity on the network and an access key which will be used to view their records.  Partners are allowed to view only transactions they were part of, and thus can keep track of all their transactions where they allocated or redeemed points.  The web application shows a basic dashboard for the partner displaying the total points that they have allocated and redeemed to members.  As transactions get complex, the partner can perform analysis on their transactions to create informative dashboards.

This code pattern is for developers looking to start building blockchain applications with Hyperledger Fabric and IBM Blockchain extension for VSCode. When the reader has completed this code pattern, they will understand how to:

* Setup a Hyperledger Fabric network on IBM Blockchain extension for VSCode.
* Install and instantiate smart contract through the IBM Blockchain extension on VSCode on a local fabric connection.
* Develop a Node.js web application with the Hyperledger Fabric SDK to interact with the deployed network

# Flow

![Architecture flow](https://github.com/ash7594/customer-loyalty-program/blob/master/docs/doc-images/arch-flow.png?raw=true)

**Note** The blockchain network will have multiple members and partners

1. Member is registered on the network
2. Member can sign-in to make transactions to earn points, redeem points and view their transactions
3. Partner is registered on the network
4. Partner can sign-in to view their transactions and display dashboard

# Components and services

* [IBM Blockchain Platform 2.0](https://console.bluemix.net/docs/services/blockchain/howto/ibp-v2-deploy-iks.html#ibp-v2-deploy-iks) gives you total control of your blockchain network with a user interface that can simplify and accelerate your journey to deploy and manage blockchain components on the IBM Cloud Kubernetes Service.
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) is designed to assist users in developing, testing, and deploying smart contracts -- including connecting to Hyperledger Fabric environments.

