var Marionette = require('backbone.marionette');

var tpl = require('./header.hbs');



module.exports = Marionette.ItemView.extend({

    template: tpl,

    ui: {
        input: '#new-todo'
    },

    events: {
        'submit form': 'onSubmit'
    },



    onSubmit: function (e) {
        // prevent form orignal submit
        e.preventDefault();

        var todoText = this.ui.input.val().trim();
        if (todoText) {
            this.collection.create({
                title: todoText
            });
            this.ui.input.val('');
        }
    }

});