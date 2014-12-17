;
(function(window, undefined) {

    app.DogCollectionView = Backbone.View.extend({
        //this is for all avaliable dogs
        el: document.querySelector(".dog"),
        initialize: function() {
        },
        render: function(collection) {
        	var self = this;
        	this.el.innerHTML = ""; // clear out old items, if any
        	collection.each(function(m){
        		var subview = new app.DogView({ model: m}); // creates a subview of each individual model
        		self.$el.append(subview.el) //appends subview
        	})
        }
    });

})(window, undefined);
