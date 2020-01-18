'use strict';

let apiUrl = location.protocol + '//' + location.host + '/api/';

console.log('at register.js');

//check user input and call server to create dataset
$('.register-member').click(function() {

    //get user input data
    let formAccountNum = $('.account-number input').val();
    let formCardId = $('.card-id input').val();
    let formFirstName = $('.first-name input').val();
    let formLastName = $('.last-name input').val();
    let formEmail = $('.email input').val();
    let formPhoneNumber = $('.phone-number input').val();

    //create json data
    let inputData = '{' + '"firstname" : "' + formFirstName + '", ' + '"lastname" : "' + formLastName + '", ' + '"email" : "' + formEmail + '", ' + '"phonenumber" : "' + formPhoneNumber + '", ' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '"}';
    console.log(inputData);

    //make ajax call to add the dataset
    $.ajax({
        type: 'POST',
        url: apiUrl + 'registerMember',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function() {
            //display loading
            document.getElementById('registration').style.display = 'none';
            document.getElementById('loader').style.display = 'block';
        },
        success: function(data) {

            //remove loader
            document.getElementById('loader').style.display = 'none';

            //check data for error
            if (data.error) {
                document.getElementById('registration').style.display = 'block';
                alert(data.error);
                return;
            } else {
                //notify successful registration
                document.getElementById('successful-registration').style.display = 'block';
                document.getElementById('registration-info').style.display = 'none';
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            //reload on error
            alert('Error: Try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });

});


//check user input and call server to create dataset
$('.register-partner').click(function() {

    //get user input data
    let formName = $('.name input').val();
    let formPartnerId = $('.partner-id input').val();
    let formCardId = $('.card-id input').val();

    //create json data
    let inputData = '{' + '"name" : "' + formName + '", ' + '"partnerid" : "' + formPartnerId + '", ' + '"cardid" : "' + formCardId + '"}';
    console.log(inputData);

    //make ajax call to add the dataset
    $.ajax({
        type: 'POST',
        url: apiUrl + 'registerPartner',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function() {
            //display loading
            document.getElementById('registration').style.display = 'none';
            document.getElementById('loader').style.display = 'block';
        },
        success: function(data) {

            //remove loader
            document.getElementById('loader').style.display = 'none';

            //check data for error
            if (data.error) {
                document.getElementById('registration').style.display = 'block';
                alert(data.error);
                return;
            } else {
                //notify successful registration
                document.getElementById('successful-registration').style.display = 'block';
                document.getElementById('registration-info').style.display = 'none';
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            //reload on error
            alert('Error: Try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });

});
