var failedLogin = function() {
    myApp.modal({
        title:  'Vertical Buttons Layout',
        text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
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