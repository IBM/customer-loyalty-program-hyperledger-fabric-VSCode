var apiUrl = location.protocol + '//' + location.host + "/api/";

console.log("at partner.js");

//check user input and call server
$('.sign-in-partner').click(function() {

  //get user input data
  var formPartnerId = $('.partner-id input').val();
  var formCardId = $('.card-id input').val();

  //create json data
  var inputData = '{' + '"partnerid" : "' + formPartnerId + '", ' + '"cardid" : "' + formCardId + '"}';

  console.log(inputData);
  document.getElementById('loader').style.display = "block";

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'partnerData',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //alert('Fetching....');
    },
    success: function(data) {
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      }
      document.getElementById('loginSection').style.display = "none";

      //sent data alert
      console.log(data);

      $('.heading').html(function() {
        var str = '<h2><b> ' + data.name + ' </b></h2>';
        str = str + '<h2><b> ' + data.id + ' </b></h2>';

        return str;
      });

      $('.dashboards').html(function() {
        var str = '';
        str = str + '<h5>Total points allocated to customers: ' + data.pointsGiven + ' </h5>';
        str = str + '<h5>Total points redeemed by customers: ' + data.pointsCollected + ' </h5>';
        return str;
      });

      $('.points-allocated-transactions').html(function() {
        var str = '';
        var transactionData = data.earnPointsResults;

        for (var i = 0; i < transactionData.length; i++) {
          str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
        }
        return str;
      });

      $('.points-redeemed-transactions').html(function() {
        var str = '';

        var transactionData = data.usePointsResults;

        for (var i = 0; i < transactionData.length; i++) {
          str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
        }
        return str;
      });


      document.getElementById('transactionSection').style.display = "block";

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);

      location.reload();
    },
    complete: function() {
      //alert('Complete')
    }
  });

});
