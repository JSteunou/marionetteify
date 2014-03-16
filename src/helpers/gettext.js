var Handlebars = require("hbsfy/runtime");
var jedi18n = require("../services/jedi18n");

Handlebars.registerHelper("gtt", function(singular, plural, n) {
    return jedi18n.gtt(singular, plural, n);
});
