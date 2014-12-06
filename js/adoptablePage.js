;
(function(window, undefined) {

    window.app = window.app || {};

    // This is to delete dogs from Database

  




    // This is to add input functions for new dogs

    var AddNewDogView = Backbone.View.extend({
        el: document.querySelector('#addNewDog'),
        model: AddNewDogModel,
        events: {
            "submit": "addToFirebase"
        },
        addToFirebase: function(event) {
            event.preventDefault();

            var values = {
                id: this.el.querySelector('#name').value,
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

    //model to get some validation ---- CURRENTLY NOT WORKING

    var AddNewDogModel = Backbone.Model.extend({
        validate: function(attrs) {
            if (!attrs.name) {
                return "Must have a name."
            }
            if (!(attrs.addto instanceof app.addToFirebase)) {
                return "todos must be an instance of the Todos Collection."
            }
        },
        initialize: function() {
            if (!this.get('name')) {
                this.set('name', new app.AddNewDogModel());
            }
        }

    });



    // Below Puts DOG Data onto Page

    // single model
    var AdoptablesModel = Backbone.Model.extend({
        // urlRoot: "https://tiy-final-project.firebaseio.com/Dogs",
        defaults: {
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
        // events: {
        //     'click #edit': 'editList',
        //     'click #remove': 'deleteList'
        // },
        // deleteList: function() {
        //     if (confirm('Are you sure you want to delete that list?')) {
        //         $.AdoptablesModel.destroy();
        //     }
        //     return true;
        // },

        render: function() {
            var someHtmlString = _.template(this.templateString, this.model.attributes);
            //console.log(someHtmlString)

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
        	var self = this;
             self.v = new AdoptablesView({
                model: modelFromFirebase
            });
            this.$el.append(self.v.el);
        },
    });
      var DeleteDogView = Backbone.View.extend({
    	el: document.querySelector('#remove'),
        events: {
            'click .remove' : 'deleteDog'
            //'click span' : "doAction"
        },
        deleteDog: function(event) {
        	this.v.destroy({
        		success: function() {
        			router.navigate('', {trigger: true});
        		}
        	})
            return false;
        }
    });

    var DeleteDogModel = Backbone.Model.extend ({


    });



    // store stuff on app for access in other files
    app.DeleteDogView = DeleteDogView;
    app.AdoptablesCollection = AdoptablesCollection;
    app.AdoptablesModel = AdoptablesModel;
    app.AdoptablesView = AdoptablesView;
    app.AdoptablesCollectionView = AdoptablesCollectionView;
    app.AddNewDogView = AddNewDogView;
    app.AddNewDogModel = AddNewDogModel;

})(window, undefined);
