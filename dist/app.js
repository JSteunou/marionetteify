(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Vendors
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');


// Local
var app = require('./app');
var TodoModule = require('./modules/todo/module');



// app bootstrap
var app = new Marionette.Application();
app.module('todo', TodoModule);
app.start();
Backbone.history.start();



module.exports = app;

},{"./app":1,"./modules/todo/module":2,"backbone":false,"backbone.marionette":false,"jquery":false}],2:[function(require,module,exports){
var Marionette, TodoModule,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require('backbone.marionette');

TodoModule = (function(_super) {
  __extends(TodoModule, _super);

  function TodoModule() {
    return TodoModule.__super__.constructor.apply(this, arguments);
  }

  TodoModule.prototype.initialize = function() {
    return this.todoRegionId = 'todo-region';
  };

  TodoModule.prototype.onStart = function() {
    this._createContainer();
    return this._addRegion();
  };

  TodoModule.prototype.onStop = function() {
    this._removeRegion();
    return this._destroyContainer();
  };

  TodoModule.prototype._createContainer = function() {
    var node;
    node = document.createElement('div');
    node.id = this.todoRegionId;
    return document.body.appendChild(node);
  };

  TodoModule.prototype._createRegion = function() {
    return this.app.addRegions({
      todoRegion: '#' + this.todoRegionId
    });
  };

  TodoModule.prototype._destroyContainer = function() {
    var node;
    node = document.getElementById(this.todoRegionId);
    return node != null ? node.parentElement.removeChild(node) : void 0;
  };

  TodoModule.prototype._removeRegion = function() {
    return this.app.removeRegion('todoRegion');
  };

  return TodoModule;

})(Marionette.Module);

module.exports = TodoModule;


},{"backbone.marionette":false}]},{},[1])