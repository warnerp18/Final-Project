;(function(window, undefined) {

    window.app = window.app || {};

    // Retrieves JSON data from Firebase

    app.DogCollection = Backbone.Firebase.Collection.extend({
        url: "https://crackling-fire-2133.firebaseio.com/dogs",
        model: app.DogModel
    });

})(window, undefined);
