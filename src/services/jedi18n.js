var Jed = require('jed');
var _ = require('underscore');


var languageService = require('./language');



var pojson = require('./translations/' + languageService.get());
var jedi18n = new Jed(pojson);
_.bindAll(jedi18n, 'gettext', 'ngettext');

// Jed gettext proxy to be able to call it directly
// or call specialized methods
function gettext(singular) {
    return jedi18n.gettext(singular);
}
gettext.gettext  = jedi18n.gettext;
gettext.ngettext = function(singular, plural, n) {
    return Jed.sprintf(jedi18n.ngettext(singular, plural, n), n);
};


module.exports = gettext;
