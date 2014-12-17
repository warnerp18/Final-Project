;
(function(window, undefined) {
    window.app = window.app || {};

    app.Router = Backbone.Router.extend({
        routes: {
            'dog/:id': 'getDog',
            '/': 'home'
        },

        getDog: function(id) {
            this.singleCollectionView.render();
        },

        initialize: function() {
        	// views
            this.appView = new app.AppView();
            this.dogCollectionView = new app.DogCollectionView();


            // collection
            this.dogCollection = new app.DogCollection();

           


            this.addDogView = new app.AddDogView({ collection: this.dogCollection });
           // this.stripepayment = new app.StripePayment();
           
        

            // handle firebase events -- after a dog is input using onpage form it will sync with firebase and rerender
		    this.dogCollectionView.listenTo(this.dogCollection, "sync", this.dogCollectionView.render);
            

            


            Backbone.history.start();
        }
    });

})(window, undefined);
