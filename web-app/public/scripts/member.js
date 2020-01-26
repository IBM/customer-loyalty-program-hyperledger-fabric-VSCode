'use strict';

let apiUrl = location.protocol + '//' + location.host + '/api/';

function updateMember() {

    //get user input data
    let formAccountNum = $('.account-number input').val();
    let formCardId = $('.card-id input').val();

    //create json data
    let inputData = '{' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '"}';
    console.log(inputData);

    //make ajax call
    $.ajax({
        type: 'POST',
        url: apiUrl + 'memberData',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function() {
            //display loading
            document.getElementById('loader').style.display = 'block';
        },
        success: function(data) {

            //remove loader
            document.getElementById('loader').style.display = 'none';

            //check data for error
            if (data.error) {
                alert(data.error);
                return;
            } else {

                //update heading
                $('.heading').html(function() {
                    let str = '<h2><b>' + data.firstName + ' ' + data.lastName + '</b></h2>';
                    str = str + '<h2><b>' + data.accountNumber + '</b></h2>';
                    str = str + '<h2><b>' + data.points + '</b></h2>';

                    return str;
                });

                //update partners dropdown for earn points transaction
                $('.earn-partner select').html(function() {
                    let str = '<option value="" disabled="" selected="">select</option>';
                    let partnersData = data.partnersData;
                    for (let i = 0; i < partnersData.length; i++) {
                        str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
                    }
                    return str;
                });

                //update partners dropdown for use points transaction
                $('.use-partner select').html(function() {
                    let str = '<option value="" disabled="" selected="">select</option>';
                    let partnersData = data.partnersData;
                    for (let i = 0; i < partnersData.length; i++) {
                        str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
                    }
                    return str;
                });

                //update earn points transaction
                $('.points-allocated-transactions').html(function() {
                    let str = '';
                    let transactionData = data.earnPointsResult;

                    for (let i = 0; i < transactionData.length; i++) {
                        str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
                    }
                    return str;
                });

                //update use points transaction
                $('.points-redeemed-transactions').html(function() {
                    let str = '';

                    let transactionData = data.usePointsResults;

                    for (let i = 0; i < transactionData.length; i++) {
                        str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
                    }
                    return str;
                });

                //remove login section and display member page
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('transactionSection').style.display = 'block';
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            //reload on error
            alert('Error: Try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        },
        complete: function() {

        }
    });
}

//check user input and call server
$('.sign-in-member').click(function() {
    updateMember();
});

function earnPoints(formPoints) {

    //get user input data
    let formAccountNum = $('.account-number input').val();
    let formCardId = $('.card-id input').val();
    let formPartnerId = $('.earn-partner select').find(':selected').attr('partner-id');
    if (!formPartnerId) {
        alert('Select partner first');
        return;
    }

    //create json data
    let inputData = '{' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '", ' + '"points" : "' + formPoints + '", ' + '"partnerid" : "' + formPartnerId + '"}';
    console.log(inputData);

    //make ajax call
    $.ajax({
        type: 'POST',
        url: apiUrl + 'earnPoints',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function() {
            //display loading
            document.getElementById('loader').style.display = 'block';
            document.getElementById('infoSection').style.display = 'none';
        },
        success: function(data) {

            document.getElementById('loader').style.display = 'none';
            document.getElementById('infoSection').style.display = 'block';

            //check data for error
            if (data.error) {
                alert(data.error);
                return;
            } else {
                //update member page and notify successful transaction
                updateMember();
                alert('Transaction successful');
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: Try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });

}

$('.earn-points-30').click(function() {
    earnPoints(30);
});

$('.earn-points-80').click(function() {
    earnPoints(80);
});

$('.earn-points-200').click(function() {
    earnPoints(200);
});


//check user input and call server
$('.earn-points-transaction').click(function() {

    let formPoints = $('.earnPoints input').val();
    earnPoints(formPoints);
});

function usePoints(formPoints) {

    //get user input data
    let formAccountNum = $('.account-number input').val();
    let formCardId = $('.card-id input').val();
    let formPartnerId = $('.use-partner select').find(':selected').attr('partner-id');

    if (!formPartnerId) {
        alert('Select partner first');
        return;
    }

    //create json data
    let inputData = '{' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '", ' + '"points" : "' + formPoints + '", ' + '"partnerid" : "' + formPartnerId + '"}';
    console.log(inputData);

    //make ajax call
    $.ajax({
        type: 'POST',
        url: apiUrl + 'usePoints',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function() {
            //display loading
            document.getElementById('loader').style.display = 'block';
            document.getElementById('infoSection').style.display = 'none';
        },
        success: function(data) {

            document.getElementById('loader').style.display = 'none';
            document.getElementById('infoSection').style.display = 'block';

            //check data for error
            if (data.error) {
                alert(data.error);
                return;
            } else {
                //update member page and notify successful transaction
                updateMember();
                alert('Transaction successful');
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: Try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        },
        complete: function() {}
    });

}

$('.use-points-50').click(function() {
    usePoints(50);
});

$('.use-points-150').click(function() {
    usePoints(150);
});

$('.use-points-200').click(function() {
    usePoints(200);
});


//check user input and call server
$('.use-points-transaction').click(function() {
    let formPoints = $('.usePoints input').val();
    usePoints(formPoints);
});