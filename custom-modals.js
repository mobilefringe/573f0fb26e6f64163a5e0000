var failedLogin = function() {
    myApp.modal({
        title:  __n['modalCheckinFailTitle'],
        text: __n['modalSigninErrorBody'],
        verticalButtons: true,
        buttons: [
            {
                text: --n['btnActionOK'],
                close: true,
            },
            {
                text: __n['modalResetPassword'],
                onClick: function() {
                    myApp.alert('You clicked second button!')
                }
            }
        ]
    })
}