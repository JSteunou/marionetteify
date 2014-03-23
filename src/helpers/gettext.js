var Handlebars = require("hbsfy/runtime");
var Jed = require('jed');

var jedi18n = require("../services/jedi18n");



Handlebars.registerHelper("gtt", jedi18n);
Handlebars.registerHelper("ngtt", jedi18n.ngettext);
