var Marionette = require('backbone.marionette');


var tpl = require('./layout.hbs');

module.exports = Marionette.Layout.extend({

    template: tpl,

    regions: {
        header:     '#header',
        main:       '#main',
        footer:     '#footer'
    }


});
