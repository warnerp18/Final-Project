window.onload = app;
// runs when the DOM is loaded
function app() {
    "use strict";
    // load some scripts (uses promises :D)
    loader.load(

        //js  
        {url: "./main/js/jquery.js"},
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},  
        {url: "./bower_components/backbone/backbone.js"}, 
        {url: "./bower_components/firebase/firebase.js"}, 
        {url: "./bower_components/backfire/dist/backbonefire.js"},
        {url: "./bower_components/bootstrap/dist/js/bootstrap.js"},
        //{url: "./bower_components/bootstrap/dist/js/bootstrap.min.js"},
        //{url: "./bower_components/bootstrap/dist/js/npm.js"},
        //{url: "./main/js/bootstrap.js"},


       // {url: "./bower_components/bootstrap/dist/css/bootstrap-theme.css"}, 
        //{url: "./bower_components/bootstrap/dist/css/bootstrap-theme.css.map"},
       // {url: "./bower_components/bootstrap/dist/css/bootstrap-theme.min.css"},
        //{url: "./bower_components/bootstrap/dist/css/bootstrap.css"},
        //{url: "./bower_components/bootstrap/dist/css/bootstrap.css.map"},
        {url: "./bower_components/bootstrap/dist/css/bootstrap.min.css"},
        {url: "./main/fonts/glyphicons-halflins-regular.eot"},
        {url: "./main/fonts/glyphicons-halflins-regular.svg"},
        {url: "./main/fonts/glyphicons-halflins-regular.ttf"},
        {url: "./main/fonts/glyphicons-halflins-regular.woff"},          
          
        // MODELS
        {url: "./js/models/dogModel.js"},

        // COLLECTIONS
        {url: "./js/collection/dogCollection.js"},

        // ROUTERS
        {url: "./js/router.js"},

        // VIEWS
        {url: "./js/views/dogView.js"},
        {url: "./js/views/dogCollectionView.js"},
        {url: "//checkout.stripe.com/checkout.js"},
        {url: "./js/stripePayment.js"}, 
        {url: "./js/views/appView.js"},
        {url: "./js/views/addDogView.js"},
        {url: "./js/views/SingleDogView.js"},

          //css
        
        {url: "./main/css/bootstrap.min.css"},
        {url: "./main/css/bootstrap.css"},
        {url: "./main/css/business-casual.css"},
        {url: "./dist/style.css"}

    ).then(function() {

        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        document.body.style.opacity = 1;

        var router = new app.Router();

    });
};