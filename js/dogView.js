;
(function(window, undefined) {

    window.app = window.app || {};

    app.DogView = Backbone.View.extend({
        tagName: "div",
        className: "availableDogs",
        templateString: $("#dogtemplate").html(),
        initialize: function(options) {
            this.render();
        },
        render: function() {
        
            var someHtmlString = _.template(this.templateString, this.model.attributes);
            console.log(this.model);
           
            this.el.innerHTML = _.template(this.templateString, this.model.attributes)
        }
    });

})(window, undefined);
