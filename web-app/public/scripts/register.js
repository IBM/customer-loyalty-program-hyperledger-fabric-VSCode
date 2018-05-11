var apiUrl = location.protocol + '//' + location.host + "/api/";

console.log("at register.js");

//check user input and call server to create dataset
$('.register-member').click(function() {

  //get user input data
  var formAccountNum = $('.account-number input').val();
  var formCardId = $('.card-id input').val();
  var formFirstName = $('.first-name input').val();
  var formLastName = $('.last-name input').val();
  var formEmail = $('.email input').val();
  var formPhoneNumber = $('.phone-number input').val();

  //create json data
  var inputData = '{' + '"firstname" : "' + formFirstName + '", ' + '"lastname" : "' + formLastName + '", ' + '"email" : "' + formEmail + '", ' + '"phonenumber" : "' + formPhoneNumber + '", ' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '"}';

  console.log(inputData)

  //**check inputs else display loading
  document.getElementById('registration').style.display = "none";
  document.getElementById('loader').style.display = "block";

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'registerMember',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //alert('Fetching....');
    },
    success: function(data) {
      //sent data alert
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      }
      console.log(data);
      document.getElementById('successful-registration').style.display = "block";
      //alert('successfully registered')
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


//check user input and call server to create dataset
$('.register-partner').click(function() {

  //get user input data
  var formName = $('.name input').val();
  var formPartnerId = $('.partner-id input').val();
  var formCardId = $('.card-id input').val();

  //create json data
  var inputData = '{' + '"name" : "' + formName + '", ' + '"partnerid" : "' + formPartnerId + '", ' + '"cardid" : "' + formCardId + '"}';

  console.log(inputData)

  //**check inputs else display loading
  document.getElementById('registration').style.display = "none";
  document.getElementById('loader').style.display = "block";

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'registerPartner',
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
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      }
      //sent data alert
      console.log(data);
      //alert('successfully registered')
      document.getElementById('successful-registration').style.display = "block";
      //location.replace("/");
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
