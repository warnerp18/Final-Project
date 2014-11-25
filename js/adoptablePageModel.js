;
(function(window, undefined) {

    window.app = window.app || {};

    var adoptables = Backbone.Model.extend({
        initialize: function() {

        }

    });


    var adoptables = new adoptables({
        name: "Spot",
        age: "2",
        weight: "60lbs",
        gender: "Male",
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0xvmQx-JT0r2IJnGkPdid00aj6GUApdrkBdClJEgHJ74I8EgD"
    });
    var age = adoptables.get("age"); console.log(age);
    var name = adoptables.get("name"); console.log(name);
    var weight = adoptables.get("weight"); console.log(weight);
    var gender = adoptables.get("gender"); console.log(gender);
    var picture = adoptables.get("picture"); console.log(picture);

})(window, undefined);
