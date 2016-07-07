myApp.onPageInit('reset-password', function(page){

  function onFormSubmit(errors, e) {
    e.preventDefault();

    if (errors.length > 0) {
      // Display an alert with all our errors
      myApp.alert(errors[0].messages.join("<br/>"), __n['modalRegistrationErrorsTitle']);
      return false;
    }

    function onSuccess(result) {      
      myApp.hidePreloader();

      mainView.router.back();
      myApp.alert(__n['modalRegistrationSuccessBody'], __n['modalRegistrationSuccessTitle']);
    }

    function onError(result) {
      myApp.alert(__n['modalRegistrationUnknownError'], __n['modalRegistrationUnknownErrorTitle']);
      myApp.hidePreloader();
    }

    var formData = new FormData(e.target);
    var endpoint = host + apis['registration'];
    myApp.showPreloader(__n["modalRegistrationBusy"]);

    $.ajax({
      url: endpoint,
      data: formData,
      success: onSuccess,
      error: onError,
      method: 'POST',
      dataType: 'json'
    });

    return false;
  }

  var validator = new FormValidator('sign-up-form', 
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
    ],
    onFormSubmit);

  // Perform the following actions on this page.
  // $('#sign-up form').on('submit', onFormSubmit);

});