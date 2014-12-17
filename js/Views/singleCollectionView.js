// ;
// (function(window, undefined) {

//     window.app = window.app || {};

//     app.SingleCollectionView = Backbone.View.extend({
//         el: document.querySelector(".singleDog"),
//         view: app.DogView,
//         render: function() {
//             var self = this;
//             this.window = ""; //this should clear out entire page to post template
    
//             collection(function(m) {
//                 var subview = new app.SingleDogView({model: m});
//                 self.$el.append(subview.el)
//             })
//         }
//     });

// })(window, undefined);