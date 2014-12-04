
window.onload = app;
// runs when the DOM is loaded
function app(){
    "use strict";
    // load some scripts (uses promises :D)
    loader.load(
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./dist/style.css"},
        {url: "./bower_components/backbone/backbone.js"},
        {url: "./bower_components/firebase/firebase.js"},
        {url: "./bower_components/backfire/dist/backbonefire.js"},
        //{url: "./js/adoptablePage.js"},
        {url: "./js/goldenBeginnings.js"},
        {url: "./dist/style.css"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        document.body.style.opacity = 1;

        // start app?
        // var appView = new app.AdoptablesCollectionView();
        // var addNewDogView = new app.AddNewDogView();
        // var deleteDogView = new app.DeleteDogView
        // console.log(deleteDogView);
        // console.log(addNewDogView);
    });
}
    
