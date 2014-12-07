;
(function(window, undefined) {

    window.app = window.app || {};


    // Pulls JSON data from Firebase to get Dog Info

    app.DogsCollection = Backbone.Firebase.Collection.extend({
        model: app.DogModel,
        url: "https://tiy-final-project.firebaseio.com/",
        initialize: function() {
        	
        }

    });

    DogsCollection = app.DogsCollection;






})(window, undefined);
