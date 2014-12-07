;
(function(window, undefined) {

    window.app = window.app || {};

    app.DogsView = Backbone.View.extend({
        tagName: "div",
        className: ".availableDogs",
        template: $("#avaliableDogs-template").html(),
        model: app.DogModel,
        collection: app.DogsCollection,
        initialize: function(options) {
            this.dogsCollection = new app.DogsCollection();
            
            this.dogsCollection.fetch();
            console.dir(this.dogsCollection)
            // debugger;

            this.render();
        },


        render: function(attributes) {
            debugger;
            var someHtmlString = _.template(this.template, this.dogsCollection.attributes);
            console.dir(someHtmlString)
            this.el.innerHTML = _.template(this.template, this.dogsCollection.attributes);
             return this;
        }

    });

    DogsView = app.DogsView;


})(window, undefined);
