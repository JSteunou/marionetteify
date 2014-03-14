var Marionette = require('backbone.marionette');

var TodoItemView = require('./item');
var tpl = require('./collection.hbs');



// Item List View
// --------------
//
// Controls the rendering of the list of items, including the
// filtering of activs vs completed items for display.
module.exports = Marionette.CompositeView.extend({
    template: tpl,
    itemView: TodoItemView,
    itemViewContainer: '#todo-list',

    ui: {
        toggle: '#toggle-all'
    },

    events: {
        'click #toggle-all': 'onToggleAllClick'
    },

    collectionEvents: {
        'all': 'update'
    },



    onRender: function () {
        this.update();
    },

    update: function () {
        function reduceCompleted(left, right) {
            return left && right.get('completed');
        }

        var allCompleted = this.collection.reduce(reduceCompleted, true);

        this.ui.toggle.prop('checked', allCompleted);
        this.$el.parent().toggle(!!this.collection.length);
    },

    onToggleAllClick: function (e) {
        var isChecked = e.currentTarget.checked;

        this.collection.each(function (todo) {
            todo.save({ 'completed': isChecked });
        });
    }

});