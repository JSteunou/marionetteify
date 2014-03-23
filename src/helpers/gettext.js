var Handlebars = require("hbsfy/runtime");
var Jed = require('jed');

var jedi18n = require("../services/jedi18n");



Handlebars.registerHelper("gtt", function(singular, plural, n) {
    if (plural) {
        return Jed.sprintf(jedi18n.ngettext(singular, plural, n), n);
    } else {
        return jedi18n(singular);
    }
});
