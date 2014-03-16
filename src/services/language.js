var config = require('../config');



var LS_KEY = 'marionetteify-lng';

/**
 * Check if the language code is in the list
 * of configuration languages list
 * @param  {String}  lng
 * @return {Boolean}
 */
var isAuthorized = function(lng) {
    var found = false;
    if (config.languages) {
        // no Array.indexOf on IE8
        for (var i = config.languages.length - 1; i >= 0; i--) {
            if (config.languages[i] === lng) {
                found = true;
                break;
            }
        }
    }

    return found;
};


var language = {

    set: function(lng) {
        if (isAuthorized(lng)) {
            localStorage.setItem(LS_KEY, lng);
        }
    },

    get: function() {
        return localStorage.getItem(LS_KEY) || config.defaultLanguage || (config.languages && config.languages[0]) || 'en';
    }

};


module.exports = language;
