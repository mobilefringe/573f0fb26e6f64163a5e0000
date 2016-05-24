myApp.onPageInit('sign-up', function(page){

  function onFormSubmit(e) {
    e.preventDefault();

    function onSuccess(result) {      
      myApp.hidePreloader();

      mainView.router.back();
      myApp.alert(__n['modalRegistrationSuccessBody'], __n['modalRegistrationSuccessTitle']);
    }

    function onError(result) {
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

  // Perform the following actions on this page.
  $('#sign-up form').on('submit', onFormSubmit);

});