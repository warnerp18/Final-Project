;
(function(window, undefined) {

    app.DogCollectionView = Backbone.View.extend({
        el: document.querySelector(".dog"),
        initialize: function() {
        },
        render: function(collection) {
        	var self = this;
        	this.el.innerHTML = ""; // clear out old items, if any
        	collection.each(function(m){
        		var subview = new app.DogView({ model: m});
        		self.$el.append(subview.el)
        	})
        }
    });

})(window, undefined);
