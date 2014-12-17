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
        
        events: {
            "click .moreInfo": "openDogInfo"
        },
        render: function() {

            var someHtmlString = _.template(this.templateString, this.model.attributes);
            //console.log(this.model);

            this.el.innerHTML = _.template(this.templateString, this.model.attributes)
        },

        openDogInfo: function(event) {
            console.log(app.SingleDogView);
            console.dir(app.SingleDogView.options);

           
            var dogInfo = new app.SingleDogView({model: this.model});
            $('.availableDogs').css('display','none');
            dogInfo.el.classList.add('activeCustom');
            this.el.classList.remove('activeCustom');
            $(".dog").append(dogInfo.el);

          
           
        }
        

    });

})(window, undefined);
