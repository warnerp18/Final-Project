;
(function(window, undefined) {
    window.app = window.app || {};

    app.Router = Backbone.Router.extend({
        routes: {
            'edit': 'editUser',
            '/': 'home'
        },

        initialize: function() {
            console.log('router working');
            

            this.appView = new app.AppView();
            this.dogsCollectionView = new app.DogsCollectionView();
            console.dir(this.dogsCollectionView)
            this.dogModel = new app.DogModel();
           
            this.dogsView = new app.DogsView({

                collection: this.dogsCollection
                
            });
            
            this.appView.$el.find('.container').append(this.dogsView.el);






        }
    });



    // router.on('route:editUser', function() {


    // });

    Router = app.Router;



    Backbone.history.start();



})(window, undefined);
