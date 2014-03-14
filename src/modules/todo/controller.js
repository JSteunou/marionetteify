var Marionette = require('backbone.marionette');

var TodoLayout = require('./views/layout/layout');
var TodosCollection = require('./models/todos');



module.exports = Marionette.Controller.extend({

    onStart: function() {
        this.todosCollection = new TodosCollection();
        this.todosCollection.fetch();
        this.todosLayout = new TodoLayout({todosCollection: this.todosCollection});
        // TODO: show only on success
        this.options.todoRegion.show(this.todosLayout);
    },


    filterItems: function(filter) {
        filter = (filter && filter.trim() || 'all');
        this.todosLayout.updateFilter(filter);
    }

});
