var Marionette = require('backbone.marionette');

var tpl = require('./footer.hbs');



module.exports = Marionette.ItemView.extend({
    template: tpl,

    ui: {
        filters: '#filters a'
    },

    events: {
        'click #clear-completed': 'onClearClick'
    },

    collectionEvents: {
        'all': 'render'
    },

    templateHelpers: {
        activeCountLabel: (this.activeCount === 1 ? 'item' : 'items') + ' left'
    },



    initialize: function () {
        // this.listenTo(App.vent, 'todoList:filter', this.updateFilterSelection, this);
    },

    serializeData: function () {
        var active = this.collection.getActive().length;
        var total = this.collection.length;

        return {
            activeCount: active,
            totalCount: total,
            completedCount: total - active
        };
    },

    onRender: function () {
        this.$el.parent().toggle(this.collection.length > 0);
        this.updateFilterSelection();
    },

    // TODO: move this to router or controller
    updateFilterSelection: function () {
        this.ui.filters
            .removeClass('selected')
            .filter('[href="' + (location.hash || '#') + '"]')
            .addClass('selected');
    },

    onClearClick: function () {
        var completed = this.collection.getCompleted();
        completed.forEach(function (todo) {
            todo.destroy();
        });
    }

});