Marionette = require 'backbone.marionette'



class TodoModule extends Marionette.Module

    initialize: ->
        this.todoRegionId = 'todo-region'


    onStart: ->
        this._createContainer()
        this._addRegion()

    onStop: ->
        this._removeRegion()
        this._destroyContainer()



    _createContainer: ->
        node = document.createElement 'div'
        node.id = this.todoRegionId
        document.body.appendChild node

    _createRegion: ->
        this.app.addRegions todoRegion: '#' + this.todoRegionId



    _destroyContainer: ->
        node = document.getElementById(this.todoRegionId)
        node?.parentElement.removeChild node

    _removeRegion: ->
        this.app.removeRegion 'todoRegion'








module.exports = TodoModule

