Marionette = require 'backbone.marionette'

Router = require './router'
Controller = require './controller'



class TodoModule extends Marionette.Module

    initialize: ->
        this.todoRegionId = 'todo-module-region'


    onStart: ->
        # encapsulate each module in a container
        # so you can do what you want without
        # affecting other modules
        this._createContainer()
        this._addRegion()
        this._startMediator()

    onStop: ->
        # remove region & container when stopping
        # unload of module could be important in big app / modules
        this._stopMediator()
        this._removeRegion()
        this._destroyContainer()



    _createContainer: ->
        node = document.createElement 'div'
        node.id = this.todoRegionId
        document.body.appendChild node

    _addRegion: ->
        this.app.addRegions todoRegion: '#' + this.todoRegionId

    _startMediator: ->
        this.controller = new Controller todoRegion: this.app.todoRegion
        router = new Router controller: this.controller




    _destroyContainer: ->
        node = document.getElementById this.todoRegionId
        node?.parentElement.removeChild node

    _removeRegion: ->
        this.app.removeRegion 'todoRegion'

    _stopMediator: ->
        this.controller.stop()






module.exports = TodoModule

