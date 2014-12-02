;
(function(window, undefined) {

        window.app = window.app || {};

        // single model
        var AdoptablesModel = Backbone.Firebase.Model.extend({
            urlRoot: "https://tiy-final-project.firebaseio.com/Dogs",
            defaults: {
                name: "Jack",
                age: "2",
                gender: "Male",
                picture: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRsOXZsZAwqOaaDUgdRNaHq6m-F4cnxxjaVFbehy20kPWfryZJ8538tg"
            }
        });
        // single view, goes with single model
        var AdoptablesView = Backbone.View.extend({
                tagName: "div",
                className: "availableDogs",
                templateString: $("#availableDogs-template").html(),
                initialize: function(options) {
                    this.render();
                },

                addNewDog: function(event) {
                    var myFirebaseRef = new Firebase("https://tiy-final-project.firebaseio.com/");

                    myFirebaseRef.push({
                        id: this.el.querySelector("name").value,
                        Age: this.el.querySelector("age").value,
                        Gender: this.el.querySelector("gender").value,
                        Picture: this.el.querySelector("picture").value,
                        Video: this.el.querySelector("video").value,
                        Weight: this.el.querySelector("weight").value

                    })
                },
                event.preventDefault();
                var newDog = {
                    name: this.el.querySelector("input").value
                };
                this.collection.add(newDog);
                this.render();
            },
            events: {
                "submit form": "addNewDog"
            },
            render: function() {
                var someHtmlString = _.template(this.templateString, this.model.attributes);
                console.log(someHtmlString);
                console.log(this.model.attributes)

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
        }
    })

    // store stuff on app for access in other files
    app.AdoptablesCollection = AdoptablesCollection; app.AdoptablesModel = AdoptablesModel; app.AdoptablesView = AdoptablesView; app.AdoptablesCollectionView = AdoptablesCollectionView;

})(window, undefined);
