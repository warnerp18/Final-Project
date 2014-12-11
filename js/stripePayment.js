var handler = StripeCheckout.configure({
    key: 'pk_test_IQ8egexbQxhI1P5V2svTNH9y',
    image: '../128x128.png',
    token: function(token) {
        debugger;
        var chargesRef = new Firebase("https://crackling-fire-2133.firebaseio.com/charges");
        chargesRef.push({
            amount: 2000 ,
            currency: "usd",
            card: token.id,
            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`
        })
    }
});

$('#customButton').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
        name: 'Demo Site',
        description: '2 widgets ($20.00)',
        amount: 2000
    });
    e.preventDefault();
});

// Close Checkout on page navigation
$(window).on('popstate', function() {
    handler.close();
});
