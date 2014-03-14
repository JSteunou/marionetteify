Marionette = require 'backbone.marionette'


TodoLayout = require './views/layout/layout'


class TodoModule extends Marionette.Module

    initialize: ->
        this.todoRegionId = 'todo-module-region'


    onStart: ->
        # encapsulate each module in a container
        # so you can do what you want without
        # affecting other modules
        this._createContainer()
        this._addRegion()
        this._addLayout()

    onStop: ->
        # remove region & container when stopping
        # unload of module could be important in big app / modules
        this._removeRegion()
        this._destroyContainer()



    _createContainer: ->
        node = document.createElement 'div'
        node.id = this.todoRegionId
        document.body.appendChild node

    _addRegion: ->
        this.app.addRegions todoRegion: '#' + this.todoRegionId

    _addLayout: ->
        this.app.todoRegion.show new TodoLayout



    _destroyContainer: ->
        node = document.getElementById this.todoRegionId
        node?.parentElement.removeChild node

    _removeRegion: ->
        this.app.removeRegion 'todoRegion'








module.exports = TodoModule

