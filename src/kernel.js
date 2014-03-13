var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var app = require('./app');

app.start();
Backbone.history.start();

