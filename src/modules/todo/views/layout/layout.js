var Marionette = require('backbone.marionette');


var HeaderView = require('./header/header');
var FooterView = require('./footer/footer');
var TodosCollection = require('../../models/todos');
var tpl = require('./layout.hbs');

module.exports = Marionette.Layout.extend({

    template: tpl,

    regions: {
        header:     '#header',
        main:       '#main',
        footer:     '#footer'
    },

    initialize: function() {
        this.todosCollection = new TodosCollection();
    },



    onShow: function() {
        this.header.show(new HeaderView({collection: this.todosCollection}));
        this.footer.show(new FooterView({collection: this.todosCollection}));
    }


});
