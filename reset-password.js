function onFormSubmit(errors, e) {
    e.preventDefault();
    if (errors.length > 0) {
        var errorString = '';
        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            errorString += errors[i].message + '<br />';
        }
        el.innerHTML = errorString;
    }
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