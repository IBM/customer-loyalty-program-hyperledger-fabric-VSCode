const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var appAdmin = config.appAdmin;
var orgMSPID = config.orgMSPID;
var gatewayDiscovery = config.gatewayDiscovery;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.join(process.cwd(), '/wallet');
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

async function he() {
  try {
    // Create a new gateway for connecting to our peer node.
    const gateway2 = new Gateway();
    await gateway2.connect(ccp, { wallet, identity: 'ac1', discovery: gatewayDiscovery });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway2.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('customerloyalty');

    let member = await contract.submitTransaction('GetState', 'all-partners');
    member = JSON.parse(JSON.parse(member.toString()));
    console.log(member);

    // Disconnect from the gateway.
    await gateway2.disconnect();
  }
  catch(err) {
    //print and return error
    console.log(err);
  }
}

he();
