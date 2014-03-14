var Marionette = require('backbone.marionette');

var tpl = require('./footer.hbs');



module.exports = Marionette.ItemView.extend({

    template: tpl

});