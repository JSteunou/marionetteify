var Marionette = require('backbone.marionette');


var FooterView = require('./footer/footer');
var tpl = require('./layout.hbs');

module.exports = Marionette.Layout.extend({

    template: tpl,

    regions: {
        header:     '#header',
        main:       '#main',
        footer:     '#footer'
    },

    onShow: function() {
        this.footer.show(new FooterView());
    }


});
