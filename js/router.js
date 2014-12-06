;
(function(window, undefined) {
    window.app = window.app || {};

    var Router = Backbone.Router.extend({
        routes: {
            'edit': 'editUser',
            '*defualt': 'home'
        },

        initialize: function() {
            console.log('router working');
            this.appView = new app.AppView();
            this.dogsView = new app.DogsView();
            
        },
        home: function () {
        	
        	
        }
    });



    // router.on('route:editUser', function() {


    // });

    app.Router = Router;
    


    Backbone.history.start();



})(window, undefined);
