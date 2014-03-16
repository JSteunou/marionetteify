var Jed = require('jed');
var _ = require('underscore');


var fr = require('../../translations/fr');


module.exports = {
    i18n: new Jed(fr),
    /**
     * Shortcut to Jed API
     * @param  {String} singular    singular key
     * @param  {String} [plural]    plural key
     * @param  {Number} [n]         plural number
     * @return {String}             translation
     */
    gtt: function(singular, plural, n) {
        var tr = this.i18n.translate(singular);
        if (_.isString(plural) && _.isNumber(n))  {
            return tr.ifPlural(n, plural).fetch(n);
        } else {
            return tr.fetch();
        }
    }
};


