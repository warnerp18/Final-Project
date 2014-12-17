;(function(window, undefined) {
    window.app = window.app || {};

    app.AddDogView = Backbone.View.extend({
        el: document.querySelector('#addNewDog'),
        events: {
            "submit": "addToFirebase"
        },
        addToFirebase: function(event) {
            event.preventDefault();

            var values = {
                name: this.el.querySelector('[name="name"]').value,
                age: this.el.querySelector('[name="age"]').value,
                gender: this.el.querySelector('[name="gender"]').value,
                weight: this.el.querySelector('[name="weight"]').value,
                picture: this.el.querySelector('[name="picture"]').value,
                description: this.el.querySelector('[name="description"]').value
            }

            // this will create a view for dog after info is put into Form and submitted.
            // also add dog info into Firebase
            this.collection.create(values); 

            // this clears form after hitting submit
            var form = document.getElementById("addNewDog"); 
            form.reset();
        }

    });
})(window, undefined);
