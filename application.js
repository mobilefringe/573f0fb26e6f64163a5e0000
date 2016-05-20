// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});


function triggerSignIn(){
  $(document).trigger('signin');
}

function triggerSignOut(){
  $(document).trigger('signout');
}

function isSignedIn() {
  return false;
}

(function(){

  function addLocation(location) {
    var html = cLocationTemplate({
      'id' : location.id,
      'imageUrl' : location.logo_url
    });

    $('#locationsWrapper').append(html);
    _locations[location.id] = location;
  }

  function verifyCode(code, locationId, userToken) {
    
    function onSuccess(result){
      processCheckins(result['checkins']);
      myApp.hidePreloader();

      if (areAllCheckedIn()) {
        myApp.alert(__n['modalAllCheckedInBody'], __n['modalAllCheckedInTitle']);
      }
      
      console.log(result);
    }

    function onFail(){
      myApp.hidePreloader();
     
    }

    myApp.showPreloader(__n["modalEnterCodeBusy"]);


    $.ajax({
      url: host + apis['verify_code'],
      dataType: 'json',
      method: 'POST',
      data: {
        'location_id' : locationId,
        'code' : code,
        'device_token': deviceToken,
        'user_token': userToken
      },
      success: onSuccess,
      error: onFail
    });
  }

  function onLocationClicked() {
    var locationId = $(this).attr('location-id');
    var userToken = "TODO";

    myApp.prompt(__n['modalEnterCodeMessage'], __n['modalEnterCodeTitle'], function (value) {
      // verify todays code here.
      verifyCode(value, locationId, userToken);
    });
  }

  function refreshEvents(){
    $('.location:not(.visited)').on('click', onLocationClicked);
  }

  function refreshProperties(){
    $.getJSON(host + endPoint, null, function(result) {
      // need to implement caching of properties.
      lp = result['loyalty_programs'][programName];

      if (lp === undefined) {
        throw "Loyalty program does not exist";
      }

      var lp = result['loyalty_programs'][programName];
      lp['details']['locations'].forEach(function(location){
        addLocation(location);
        apis = lp['details']['endpoints'];
      });

      refreshEvents();
      fetchCheckins();

    }, 'json');


  }
  
  function processCheckins(locations) {
    // If they passed in the locations then reset the cached version with those.
    if (locations !== null) {
      _checkedInLocations = locations;
    }

    // Loop over all our locations and change the class to those found to active.
    for (var id in _checkedInLocations) {
      $('.location[location-id="' + id + '"]').
        addClass('visited').
        off('click', onLocationClicked);
    }

    if (areAllCheckedIn()){
      $('.checkin-complete').show();
    }
  }

  function areAllCheckedIn() {
    // Return true if all locations are visted false otherwise.
    var checkedIn = Object.keys(_checkedInLocations);
    var locations = Object.keys(_locations);

    // If there are no locations then answer is always false.
    if (locations.length === 0) {
      return false;
    }

    // Loop over locations and check the checkin object if key is missing - then answer is no.
    for (var x in locations) {
      var val = locations[x];
      if (_checkedInLocations[val] === undefined) {
        return false;
      }
    }

    // Otherwise they've past all our tests return true.
    return true;
  }

  function fetchCheckins(){

    function onSuccess(result) {
      processCheckins(JSON.parse(result));
    }

    $.post(host + apis['checkins'], {device_token: deviceToken, user_token: userToken}, onSuccess);
  }

  function onSignInClicked(e){

    // Display Buttons 
    var buttons = [
      [
        {
          'text' : __n['btnActionSignIn'],
          'onClick' : showSignIn
        },
        {
          'text': __n['btnActionCreateAccount']
        }
      ], 
      [
        {
          'text': __n['btnActionCancel']
        }
      ]
    ];

    myApp.actions(buttons);

  }

  function showSignIn(e){
    myApp.modalLogin('', __n['modalLoginTitle'], processSignIn);
  }

  function onSignInSuccess(e) {
    // Good Signin - 
    // Update the toolbar callback.
    window.location = 'toolbar://login/signin/success';
  }

  function processSignIn(username, password){
    console.log(username, password);
    onSignInSuccess();
  }

  // Get the json 
  // var host = 'http://twinpines.lvh.me:3000';
  var host = 'http://twinpines.mallmaverickstaging.com';
  // var host = 'https://mallcms.localtunnel.me';
  var endPoint = '/api/v2/twinpines/loyalty_programs.json';
  var programName = 'dining-passport';
  var deviceToken = window.location.href.match(/dToken=(.*)/i)[1];
  var apis = null;
  var _checkedInLocations = {};
  var userToken = null;
  var _locations = {};

  try{
    refreshProperties();
  } catch (ex) {
    // handle failures here.
  }


  var locationTemplate = $('script#locationTemplate').html();
  var cLocationTemplate = Template7.compile(locationTemplate);

  // Attach sign in handler
  $(document).on('signin', onSignInClicked);

  $('#signIn').on('click', triggerSignIn);

})();