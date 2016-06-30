var failedLogin = function() {
    myApp.modal({
        title:  __n['modalCheckinFailTitle'],
        text: __n['modalSigninErrorBody'],
        verticalButtons: true,
        buttons: [
            {
                text: 'Button 1',
                onClick: function() {
                    myApp.alert('You clicked first button!')
                }
            },
            {
                text: 'Button 2',
                onClick: function() {
                    myApp.alert('You clicked second button!')
                }
            }
        ]
    })
}