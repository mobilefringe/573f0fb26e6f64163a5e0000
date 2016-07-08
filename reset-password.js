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
    var formData = new FormData(e.target);
    var endPoint = '/api/v2/twinpines/loyalty_programs.json';
    var programName = 'dining-passport';
    
    $.getJSON(host + endPoint, null, function(result) {
        lp = result['loyalty_programs'][programName];
        if (lp === undefined) {
            throw "Loyalty program does not exist";
        }
        var lp = result['loyalty_programs'][programName];
        var submitUrl = lp.details.update_password;
        console.log(submitUrl)
    }, 'json');
}

$(document).ready(function(){
  var validator = new FormValidator('reset-password-form', 
    [
      {
        name: 'password',
        display: 'Password',
        rules: 'required|min_length[4]'
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