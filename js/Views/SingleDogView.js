;
(function(window, undefined) {

    window.app = window.app || {};

    app.SingleDogView = Backbone.View.extend({
        tagName: "div",
        className: "singleDogInfo",
        templateString: $("#dogInfoTemplate").html(),
        initialize: function() {
            
            this.render();
        },
        render: function() {

            var htmlString =  _.template(this.templateString, this.model.attributes);
            this.el.innerHTML = htmlString
        }

    });



})(window, undefined);
