Marionette = require 'backbone.marionette'

class TodoModule extends Marionette.Module

    onStart: ->
        console.log '===== started'


module.exports = TodoModule
