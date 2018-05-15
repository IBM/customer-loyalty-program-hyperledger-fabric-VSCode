# Deploy application to IBM Cloud

You can deploy the application to IBM Cloud with the network hosted on the IBM Blockhain Starter Plan.

* First, add `connection-profile.json` into the `network` folder.


* Next update `network.js` in that folder to retrieve connection from `connection-profile.json`.  You will update the code to use `connection-profile.json` instead of `./local_connection.json`

<p align="center">
  <img width="800"  src="doc-images/connection-profile-code.png">
</p>


* Next, add the `admin@clp-network.card` file to `webapp` folder.  We will deploy the card with application.

* Update `package.json` file in your `web-app` folder and make the following update to the `start` script.
```
"scripts": {
  "start": "composer card import -f admin@clp-network.card && node app.js",
```
Add the following to ensure correct node version
```
"engines": {
  "node": "^8.11.0"
},
```

* Open `manifest.yml` file. Give a unique url name by updating the `name` field.
```
applications:
- disk_quota: 1024M
  name: clp-on-ibm-blockchain
  buildpack: sdk-for-nodejs
  command: "npm start"
  path: "."
  instances: 1
  memory: 256M
```

* Now you are ready to deploy the application to IBM Cloud.  You can use cloud foundry cli to deploy the application.  In the `web-app` directory, run the following command.

```
cf push
```

View a sample app here: http://clp-test-ibm-blockchain.mybluemix.net/
