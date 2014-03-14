var Marionette = require('backbone.marionette');


var HeaderView = require('./header/header');
var TodosView = require('../todos/collection');
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
        var options = {collection: this.todosCollection};

        this.header.show(new HeaderView(options));
        this.main.show(new TodosView(options));
        this.footer.show(new FooterView(options));
    }

});
