const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');


const namespace = 'org.clp.biznet';

// In-memory card store for testing so cards are not persisted to the file system
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

// Admin connection to the blockchain, used to deploy the business network
let adminConnection;

// This is the business network connection the tests will use.
let businessNetworkConnection;

// These are a list of receieved events.
let events;

let businessNetworkName = 'clp-network';
let factory;



/*
 *
 * @param {String} cardName The card name to use for this identity
 * @param {Object} identity The identity details
 */
async function importCardForIdentity(cardName, identity) {

  console.log('importCardForIdentity')
  adminConnection = new AdminConnection();
  businessNetworkName = 'clp-network';

  const metadata = {
      userName: identity.userID,
      version: 1,
      enrollmentSecret: identity.userSecret,
      businessNetwork: businessNetworkName
  };
  const connectionProfile = require('./local_connection.json');
  const card = new IdCard(metadata, connectionProfile);

  await adminConnection.importCard(cardName, card);
}



/*
* Reconnect using a different identity.
* @param {String} cardName The identity to use.
*/
async function useIdentity(cardName) {
  await businessNetworkConnection.disconnect();

  businessNetworkConnection = new BusinessNetworkConnection();

  await businessNetworkConnection.connect(cardName);
}

module.exports = {

  /*
  * Create participant
  * @param {String} firstName first name
  * @param {String} lastName last name
  * @param {String} email email
  * @param {String} id id
  */
 registerMember: async function (cardId, accountNumber,firstName, lastName, email, phoneNumber) {
    try {
      console.log("start");

      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@clp-network');

      // Get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      // Create the participants.
      const member = factory.newResource(namespace, 'Member', accountNumber);
      member.firstName = firstName;
      member.lastName = lastName;
      member.email = email;
      member.phoneNumber = phoneNumber;
      member.points = 0;

      const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Member');
      await participantRegistry.add(member);

      // Issue the identities.
      const identity = await businessNetworkConnection.issueIdentity(namespace + '.Member#' + accountNumber, cardId);
      await importCardForIdentity(cardId, identity);

      await businessNetworkConnection.disconnect('admin@clp-network');
      console.log("end");
      return true;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }

  },

  registerPartner: async function (cardId, partnerId, name) {

    try {
      console.log("registerPartner");

      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@clp-network');

      // Get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      // Create the participant
      const partner = factory.newResource(namespace, 'Partner', partnerId);
      partner.name = name;

      const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Partner');
      await participantRegistry.add(partner);

      // Issue the identities.
      const identity = await businessNetworkConnection.issueIdentity(namespace + '.Partner#' + partnerId, cardId);
      await importCardForIdentity(cardId, identity);

      await businessNetworkConnection.disconnect('admin@clp-network');
      console.log("end");
      return true;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }

  },

  earnPointsTransaction: async function (cardId, accountNumber, partnerId, points) {

    try {
      console.log("earnPoints");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      // Get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      // perform transaction
      const earnPoints = factory.newTransaction(namespace, 'EarnPoints');
      earnPoints.points = points;
      earnPoints.member = factory.newRelationship(namespace, 'Member', accountNumber);
      earnPoints.partner = factory.newRelationship(namespace, 'Partner', partnerId);

      await businessNetworkConnection.submitTransaction(earnPoints);

      await businessNetworkConnection.disconnect(cardId);

      return true;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }

  },

  usePointsTransaction: async function (cardId, accountNumber, partnerId, points) {

    try {
      console.log("usePoints");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      // Get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      // perform transaction
      const usePoints = factory.newTransaction(namespace, 'UsePoints');
      usePoints.points = points;
      usePoints.member = factory.newRelationship(namespace, 'Member', accountNumber);
      usePoints.partner = factory.newRelationship(namespace, 'Partner', partnerId);

      await businessNetworkConnection.submitTransaction(usePoints);

      await businessNetworkConnection.disconnect(cardId);

      return true;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }


  },

  memberData: async function (cardId, accountNumber) {

    try {

      console.log("memberData");
      businessNetworkConnection = new BusinessNetworkConnection();

      await businessNetworkConnection.connect(cardId);

      // Get the factory for the business network.
      const memberRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Member');
      const member = await memberRegistry.get(accountNumber);

      await businessNetworkConnection.disconnect(cardId);

      return member;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }


  },

  partnerData: async function (cardId, partnerId) {

    try {

      console.log("partnerData");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      // Get the factory for the business network.
      const partnerRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Partner');
      const partner = await partnerRegistry.get(partnerId);

      await businessNetworkConnection.disconnect(cardId);


      return partner;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }


  },

  allPartnersInfo : async function (cardId) {

    try {
      console.log("partnerTransactions");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      const allPartners = await businessNetworkConnection.query('selectPartners');

      await businessNetworkConnection.disconnect(cardId);

      return allPartners;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }
  },

  earnPointsTransactionsInfo: async function (cardId) {

    try {
      console.log("partnerTransactions");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      const earnPointsResults = await businessNetworkConnection.query('selectEarnPoints');

      await businessNetworkConnection.disconnect(cardId);

      return earnPointsResults;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }

  },

  usePointsTransactionsInfo: async function (cardId) {

    try {
      console.log("partnerTransactions");
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      const usePointsResults = await businessNetworkConnection.query('selectUsePoints');

      await businessNetworkConnection.disconnect(cardId);

      return usePointsResults;
    }
    catch(err) {
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }

  }


}
