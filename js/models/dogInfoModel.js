;
(function(window, undefined) {

    window.app = window.app || {};

    app.DogInfo = Backbone.Model.extend({
    	default: {
    		name:"Jack",
    		age: "2 years",
    		gender: "Male",
    		weight: "65 lbs",
    		description: "A wonderful dog looking for his forever home. He is extremely loving."
    	},
        intialize: function() {

        };

    })


})(window, undefined);
