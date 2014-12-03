;
(function(window, undefined) {

    window.app = window.app || {};

    var AddNewDogView = Backbone.View.extend({
        el: document.querySelector('#addNewDog'),
        events: {
            "submit": "addToFirebase"
        },
        addToFirebase: function(event) {
        	event.preventDefault();
        	
        	var values = {
        	    name: this.el.querySelector('#name').value,
        	    age: this.el.querySelector('#age').value,
        	    gender: this.el.querySelector('#gender').value,
        	    weight: this.el.querySelector('#weight').value,
        	    picture: this.el.querySelector('#picture').value,
        	    video: this.el.querySelector('#video').value
        	}
        	 
        	var firebaseCollection = new AdoptablesCollection();
        	firebaseCollection.create(values)

            // this.$el.html(
            	// this.set({id: this.el.querySelector("name").value})
            // )
        }

    });

    // single model
    var AdoptablesModel = Backbone.Model.extend({
        // urlRoot: "https://tiy-final-project.firebaseio.com/Dogs",
        defaults: {
            name: "Jack",
            age: "2",
            gender: "Male",
            picture: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRsOXZsZAwqOaaDUgdRNaHq6m-F4cnxxjaVFbehy20kPWfryZJ8538tg"
        }
    })

    // single view, goes with single model
    var AdoptablesView = Backbone.View.extend({
        tagName: "div",
        className: "availableDogs",
        templateString: $("#availableDogs-template").html(),
        initialize: function(options) {
            this.render();
        },

        render: function() {
            var someHtmlString = _.template(this.templateString, this.model.attributes);
            console.log(someHtmlString)

            this.el.innerHTML = _.template(this.templateString, this.model.attributes);
            return this;

        }
    });

    // collection of models
    var AdoptablesCollection = Backbone.Firebase.Collection.extend({
        url: "https://tiy-final-project.firebaseio.com/Dogs",
        model: AdoptablesModel
    });

    // collection view
    var AdoptablesCollectionView = Backbone.View.extend({
        el: document.querySelector(".availableDogsContainer"),
        initialize: function() {
            this.collection = new AdoptablesCollection();
            this.listenTo(this.collection, "add", this.addOne)
        },
        addOne: function(modelFromFirebase, collection, extraOptions) {
            var v = new AdoptablesView({
                model: modelFromFirebase
            });
            this.$el.append(v.el);
        },
    });


    // store stuff on app for access in other files
    app.AdoptablesCollection = AdoptablesCollection;
    app.AdoptablesModel = AdoptablesModel;
    app.AdoptablesView = AdoptablesView;
    app.AdoptablesCollectionView = AdoptablesCollectionView;
    app.AddNewDogView = AddNewDogView;

})(window, undefined);
