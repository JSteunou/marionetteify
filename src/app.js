var Marionette = require('backbone.marionette');

var TodoModule = require('./modules/todo/module');


var app = new Marionette.Application();
app.module('todo', TodoModule);


module.exports = app;
