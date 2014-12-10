;(function(window, undefined) {
    window.app = window.app || {};

    app.StripePayment = Backbone.View.extend({
        el: document.querySelector('#stripePayment'),
        events: {
            "click": "acceptPayment"
        },

        acceptPayment: function() {
            var stripe = require("stripe")("sk_test_4FoZ1mQyndLWzg88j8EinVl3");

            // (Assuming you're using express - expressjs.com)
            // Get the credit card details submitted by the form
            debugger;
            var stripeToken = request.body.stripeToken;

            var charge = stripe.charges.create({
                amount: 25000, // amount in cents, again
                currency: "usd",
                card: stripeToken,
                description: "payinguser@example.com"
            }, function(err, charge) {
                if (err && err.type === 'StripeCardError') {
                    // The card has been declined
                }
            });
        }

    })


})(window, undefined);


// app.AddDogView = Backbone.View.extend({
//             el: document.querySelector('#addNewDog'),
//             events: {
//                 "submit": "addToFirebase"
//             },
//             addToFirebase: function(event) {
//                 event.preventDefault();

//                 var values = {
//                     name: this.el.querySelector('[name="name"]').value,
//                     age: this.el.querySelector('[name="age"]').value,
//                     gender: this.el.querySelector('[name="gender"]').value,
//                     weight: this.el.querySelector('[name="weight"]').value,
//                     picture: this.el.querySelector('[name="files[]"]').value,
//                     description: this.el.querySelector('[name="description"]').value
//                 }

//                 this.collection.create(values);
//             }
