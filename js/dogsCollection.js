;
(function(window, undefined) {

    window.app = window.app || {};

    app.DogsCollection = Backbone.Collection.extend({
    	url: "https://tiy-final-project.firebaseio.com/Dogs"

    });

    



})(window, undefined);
