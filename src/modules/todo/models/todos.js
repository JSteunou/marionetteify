var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");

var TodoModel = require('./todo');



module.exports = Backbone.Collection.extend({

    model: TodoModel,

    localStorage: new Backbone.LocalStorage('todos-backbone-marionette-browserify'),



    getCompleted: function () {
        return this.filter(this._isCompleted);
    },

    getActive: function () {
        return this.reject(this._isCompleted);
    },

    comparator: function (todo) {
        return todo.get('created');
    },



    _isCompleted: function (todo) {
        return todo.isCompleted();
    }

});