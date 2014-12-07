 ;
 (function(window, undefined) {

     window.app = window.app || {};

     app.DogModel = Backbone.Model.extend({
         defaults: {
         	id: 'Jack',
             name: 'Jack',
             age: '4 Years',
             picture: 'http://images2.fanpop.com/image/photos/9700000/Sad-Puppy-puppies-9726248-1600-1200.jpg',
             gender: 'Male',
             weight: '55lbs'
         },
         validate: function(attr) {
             if (!attr.name && !attr.gender) {
                 return 'Must input a name and gender'
             }
             if (!attr.picture) {
                 return 'You did not provide a picture'
             }
         },
         intialize: function(){
         	
         }
     });


    DogModel = app.DogModel;

 })(window, undefined);
