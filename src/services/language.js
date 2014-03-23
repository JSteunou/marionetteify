var _ = require('underscore');


var config = require('../config');



var LS_KEY = 'marionetteify-lng';

/**
 * Check if the language code is in the list
 * of configuration languages list
 * @param  {String}  lng
 * @return {Boolean}
 */
var isAuthorized = function(lng) {
    // no Array.indexOf on IE8
    return _.indexOf(config.languages, lng) > -1;
};

var normalize = function(lng) {
    return (lng && lng.slice) ? lng.slice(0, 2) : '';
};


var language = {

    set: function(lng) {
        lng = normalize(lng);
        if (isAuthorized(lng)) {
            localStorage.setItem(LS_KEY, lng);
        }
    },

    get: function() {
        var lng = normalize(localStorage.getItem(LS_KEY));
        if (isAuthorized(lng)) return lng;

        lng = normalize(navigator.language || navigator.userLanguage);
        if (isAuthorized(lng)) return lng;

        return normalize(config.defaultLanguage || (config.languages && config.languages[0]));
    }

};


module.exports = language;
