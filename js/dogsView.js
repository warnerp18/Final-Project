;
(function(window, undefined) {

    window.app = window.app || {};

    app.DogsView = Backbone.View.extend({
        el: '.avaliableDogs',
        initialize: function(){
        	this.render();
        },
        render: function(){
        	this.$el.html('content');
        }

       
    });

    DogsView = app.DogsView;


})(window, undefined);
