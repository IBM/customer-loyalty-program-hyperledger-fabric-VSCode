'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')

const app = express();
const router = express.Router();

var network = require('./network/network.js');
var validate = require('./network/validate.js');
var analysis = require('./network/analysis.js');

// Bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));

app.use(bodyParser.json());

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/member', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/member.html'));
});

app.get('/registerMember', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerMember.html'));
});

app.get('/partner', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/partner.html'));
});

app.get('/registerPartner', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerPartner.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/about.html'));
});



app.post('/api/registerMember', function(req, res) {

  var accountNumber = req.body.accountnumber;
  var cardId = req.body.cardid;
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  var phoneNumber = req.body.phonenumber;

  console.log('Using param - firstname: ' + firstName + ' lastname: ' + lastName + ' email: ' + email + ' phonenumber: ' + phoneNumber + ' accountNumber: ' + accountNumber + ' cardId: ' + cardId);

  validate.validateMemberRegistration(cardId, accountNumber, firstName, lastName, email, phoneNumber)
    .then((response) => {
      if (response.error != null) {
        res.json({
          error: response.error
        });
        return;
      } else {
        network.registerMember(cardId, accountNumber, firstName, lastName, email, phoneNumber)
          .then((response) => {
            if (response.error != null) {
              //console.log(response.error)
              res.json({
                error: response.error
              });
            } else {
              console.log('return now')
              res.json({
                success: response
              });
            }
          });
      }
    });


});


app.post('/api/registerPartner', function(req, res) {

  var name = req.body.name;
  var partnerId = req.body.partnerid;
  var cardId = req.body.cardid;

  console.log('Using param - name: ' + name + ' partnerId: ' + partnerId + ' cardId: ' + cardId);

  validate.validatePartnerRegistration(cardId, partnerId, name)
    .then((response) => {
      if (response.error != null) {
        res.json({
          error: response.error
        });
        return;
      } else {
        network.registerPartner(cardId, partnerId, name)
          .then((response) => {
            if (response.error != null) {
              //console.log(response.error)
              res.json({
                error: response.error
              });
            } else {
              console.log('return now')
              res.json({
                success: response
              });
            }
          });
      }
    });

});


app.post('/api/earnPoints', function(req, res) {

  var accountNumber = req.body.accountnumber;
  var cardId = req.body.cardid;
  var partnerId = req.body.partnerid;
  var points = parseFloat(req.body.points);

  console.log('Using param - points: ' + points + ' partnerId: ' + partnerId + ' accountNumber: ' + accountNumber + ' cardId: ' + cardId);

  validate.validatePoints(points)
    .then((checkPoints) => {
      if (checkPoints.error != null) {
        res.json({
          error: checkPoints.error
        });
        return;
      } else {
        points = checkPoints;
        network.earnPointsTransaction(cardId, accountNumber, partnerId, points)
          .then((response) => {
            if (response.error != null) {
              res.json({
                error: response.error
              });
            } else {
              console.log('return now')
              res.json({
                success: response
              });
            }
          });
      }
    });

});


app.post('/api/usePoints', function(req, res) {

  var accountNumber = req.body.accountnumber;
  var cardId = req.body.cardid;
  var partnerId = req.body.partnerid;
  var points = parseFloat(req.body.points);

  console.log('Using param - points: ' + points + ' partnerId: ' + partnerId + ' accountNumber: ' + accountNumber + ' cardId: ' + cardId);

  validate.validatePoints(points)
    .then((checkPoints) => {
      if (checkPoints.error != null) {
        res.json({
          error: checkPoints.error
        });
        return;
      } else {
        points = checkPoints;
        network.usePointsTransaction(cardId, accountNumber, partnerId, points)
          .then((response) => {
            if (response.error != null) {
              res.json({
                error: response.error
              });
            } else {
              console.log('return now')
              res.json({
                success: response
              });
            }
          });
      }
    });


});


app.post('/api/memberData', function(req, res) {

  var accountNumber = req.body.accountnumber;
  var cardId = req.body.cardid;

  var returnData = {};

  console.log('memberData using param - ' + ' accountNumber: ' + accountNumber + ' cardId: ' + cardId);

  network.memberData(cardId, accountNumber)
    .then((member) => {

      if (member.error != null) {
        res.json({
          error: member.error
        });
      } else {

        returnData.accountNumber = member.accountNumber;
        returnData.firstName = member.firstName;
        returnData.lastName = member.lastName;
        returnData.phoneNumber = member.phoneNumber;
        returnData.email = member.email;
        returnData.points = member.points;
      }

    })
    .then(() => {
      network.usePointsTransactionsInfo(cardId)
        .then((usePointsResults) => {
          if (usePointsResults.error != null) {
            res.json({
              error: usePointsResults.error
            });
          } else {
            returnData.usePointsResults = usePointsResults;
          }

        }).then(() => {
          network.allPartnersInfo(cardId)
            .then((partnersInfo) => {
              if (partnersInfo.error != null) {
                res.json({
                  error: partnersInfo.error
                });
              } else {
                returnData.partnersData = partnersInfo;
              }

            })
            .then(() => {
              network.earnPointsTransactionsInfo(cardId)
                .then((earnPointsResults) => {
                  if (earnPointsResults.error != null) {
                    res.json({
                      error: earnPointsResults.error
                    });
                  } else {
                    returnData.earnPointsResult = earnPointsResults;
                  }

                  res.json(returnData);

                });
            });
        });
    });

});


app.post('/api/partnerData', function(req, res) {

  var partnerId = req.body.partnerid;
  var cardId = req.body.cardid;

  var returnData = {};

  console.log('partnerData using param - ' + ' partnerId: ' + partnerId + ' cardId: ' + cardId);


  network.partnerData(cardId, partnerId)
    .then((partner) => {
      console.log(partner)
      if (partner.error != null) {
        res.json({
          error: partner.error
        });
      } else {
        returnData.id = partner.id;
        returnData.name = partner.name;
      }
    })
    .then(() => {
      network.usePointsTransactionsInfo(cardId)
        .then((usePointsResults) => {
          if (usePointsResults.error != null) {
            res.json({
              error: usePointsResults.error
            });
          } else {
            returnData.usePointsResults = usePointsResults;
            returnData.pointsCollected = analysis.totalPointsCollected(usePointsResults);
          }


        })
        .then(() => {
          network.earnPointsTransactionsInfo(cardId)
            .then((earnPointsResults) => {
              if (earnPointsResults.error != null) {
                res.json({
                  error: earnPointsResults.error
                });
              } else {
                returnData.earnPointsResults = earnPointsResults;
                returnData.pointsGiven = analysis.totalPointsGiven(earnPointsResults);
              }

              res.json(returnData);

            });
        });
    });

});

var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

app.listen(port, function() {
  console.log('app running on port: %d', port);
});
