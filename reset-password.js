function onFormSubmit(errors, e) {
    var el = "#error_box";
    e.preventDefault();
    if (errors.length > 0) {
        var errorString = '';
        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            errorString += errors[i].message + '<br />';
        }
        $(el).html(errorString);
        $(el).show();
        return false;
    }
    $('#reset_password_token').val(getUrlParameter('reset_password_token'))
    var formData = $('#reset-password-form').serialize();
    
     
    var endPoint = '/api/v2/twinpines/loyalty_programs.json';
    var programName = 'dining-passport';
    
    $.getJSON(host + endPoint, null, function(result) {
        
        lp = result['loyalty_programs'][programName];
        if (lp === undefined) {
            throw "Loyalty program does not exist";
        }
        var lp = result['loyalty_programs'][programName];
        var submitUrl = lp.details.endpoints.update_password;
        submitForm(formData, submitUrl);
        
    }, 'json');
}

$(document).ready(function(){
  var validator = new FormValidator('reset-password-form', 
    [
      {
        name: 'password',
        display: 'Password',
        rules: 'required|min_length[6]'
      },
      {
        name: 'password_confirmation',
        display: 'Password Confirmation',
        rules: 'required|matches[password]'
      }
    ], onFormSubmit);

  // Perform the following actions on this page.
  // $('#sign-up form').on('submit', onFormSubmit);

})

function submitForm(data, url){
    var endpoint = host + url;
    $.ajax({
        url: endpoint,
        data: data,
        success: resetSuccess,
        error: resetError,
        method: 'POST',
        dataType: 'json'
    });

    return false;
}

function resetSuccess(result) {      
    alert(__n['resetSuccess']) 
}
    
function resetError(result) {
    var el = "#error_box";
    $(el).html(__n['resetError']);
    $(el).show();
    $('#reset-password-form').trigger('reset')
    
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
