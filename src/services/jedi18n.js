var Jed = require('jed');
var _ = require('underscore');


var languageService = require('./language');



var pojson = require('./translations/' + languageService.get());
var jedi18n = new Jed(pojson);


function gettext() {
    jedi18n.gettext.apply(jedi18n, arguments);
}

gettext.gettext  = _.bind(jedi18n.gettext, jedi18n);
gettext.ngettext = _.bind(jedi18n.ngettext, jedi18n);



module.exports = gettext;
