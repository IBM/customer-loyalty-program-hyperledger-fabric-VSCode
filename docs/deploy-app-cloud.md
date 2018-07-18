# Deploy application to IBM Cloud

You can deploy the application to IBM Cloud with the network hosted on the IBM Blockhain Starter Plan.

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

* Now you are ready to deploy the application to IBM Cloud.  You can use [IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/download_cli.html#download_install) to deploy the application.  In the `web-app` directory, run the following command.

```
bx push
```

View a sample app here: http://clp-test-ibm-blockchain.mybluemix.net/
