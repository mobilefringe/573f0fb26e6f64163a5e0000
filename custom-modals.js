var failedLogin = function() {
    myApp.modal({
        title:  __n['modalCheckinFailTitle'],
        text: __n['modalSigninErrorBody'],
        verticalButtons: true,
        buttons: [
            {
                text: __n['btnActionOK'],
                close: true,
            },
            {
                text: __n['modalResetPassword'],
                onClick: function() {
                    myApp.prompt(__n['modalEnterEmail'], __n['modalResetPassword']);
                }
            }
        ]
    })
}