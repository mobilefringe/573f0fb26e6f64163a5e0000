$(document).ready(function(){
    $('#reset-password-form').submit(function(){
    alert("df")
    return false;
  })

  var validator = new FormValidator('reset-password', 
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
    ]);

  // Perform the following actions on this page.
  // $('#sign-up form').on('submit', onFormSubmit);

})