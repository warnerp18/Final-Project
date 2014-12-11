;
(function(window, undefined) {
    window.app = window.app || {};

    app.Router = Backbone.Router.extend({
        routes: {
            'edit': 'editUser',
            '/': 'home'
        },

        initialize: function() {
        	// views
            this.appView = new app.AppView();
            this.dogCollectionView = new app.DogCollectionView();

            // collection
            this.dogCollection = new app.DogCollection();

            this.addDogView = new app.AddDogView({ collection: this.dogCollection });
           // this.stripepayment = new app.StripePayment();

            // handle firebase events
		    this.dogCollectionView.listenTo(this.dogCollection, "sync", this.dogCollectionView.render)

            Backbone.history.start();
        }
    });

})(window, undefined);
