;
(function(window, undefined) {

    app.DogsCollectionView = Backbone.View.extend({
        el: document.querySelector('.avaliableDogs'),
        intialize: function() {
            this.dogsCollection = new app.DogsCollection();
            console.log(this.dogsCollection)

        }

    });
    DogsCollectionView = app.DogsCollectionView;

})(window, undefined);
