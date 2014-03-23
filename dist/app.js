require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Vendors
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');


// Local
require('./helpers/gettext');
var TodoModule = require('./modules/todo/module');



// app bootstrap
var app = new Marionette.Application();
app.module('todo', TodoModule);
app.start();
Backbone.history.start();



module.exports = app;

},{"./helpers/gettext":3,"./modules/todo/module":7,"backbone":false,"backbone.marionette":false,"jquery":false}],2:[function(require,module,exports){
module.exports={
    "languages": [
        "en",
        "fr"
    ],
    "defaultLanguage": "fr"
}

},{}],3:[function(require,module,exports){
var Handlebars = require("hbsfy/runtime");
var Jed = require('jed');

var jedi18n = require("../services/jedi18n");



Handlebars.registerHelper("gtt", jedi18n);
Handlebars.registerHelper("ngtt", jedi18n.ngettext);

},{"../services/jedi18n":19,"hbsfy/runtime":false,"jed":false}],4:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var TodoLayout = require('./views/layout/layout');
var TodosCollection = require('./models/todos');



module.exports = Marionette.Controller.extend({

    onStart: function() {
        this.todosCollection = new TodosCollection();
        this.todosLayout = new TodoLayout({todosCollection: this.todosCollection});

        var onSuccess = function() {
            this.options.todoRegion.show(this.todosLayout);
        }.bind(this);
        this.todosCollection.fetch({success: onSuccess});
    },


    filterItems: function(filter) {
        filter = (filter && filter.trim() || 'all');
        this.todosLayout.updateFilter(filter);
    }

});

},{"./models/todos":6,"./views/layout/layout":14,"backbone.marionette":false}],5:[function(require,module,exports){
var Backbone = require('backbone');



module.exports = Backbone.Model.extend({

    defaults: {
        title: '',
        completed: false,
        created: 0
    },



    initialize: function () {
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    },

    toggle: function () {
        return this.set('completed', !this.isCompleted());
    },

    isCompleted: function () {
        return this.get('completed');
    }

});
},{"backbone":false}],6:[function(require,module,exports){
var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");

var TodoModel = require('./todo');



module.exports = Backbone.Collection.extend({

    model: TodoModel,

    localStorage: new Backbone.LocalStorage('todos-backbone-marionette-browserify'),



    getCompleted: function () {
        return this.filter(this._isCompleted);
    },

    getActive: function () {
        return this.reject(this._isCompleted);
    },

    comparator: function (todo) {
        return todo.get('created');
    },



    _isCompleted: function (todo) {
        return todo.isCompleted();
    }

});
},{"./todo":5,"backbone":false,"backbone.localstorage":false}],7:[function(require,module,exports){
var Controller, Marionette, Router, TodoModule,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require('backbone.marionette');

Router = require('./router');

Controller = require('./controller');

TodoModule = (function(_super) {
  __extends(TodoModule, _super);

  function TodoModule() {
    return TodoModule.__super__.constructor.apply(this, arguments);
  }

  TodoModule.prototype.initialize = function() {
    return this.todoRegionId = 'todo-module-region';
  };

  TodoModule.prototype.onStart = function() {
    this._createContainer();
    this._addRegion();
    return this._startMediator();
  };

  TodoModule.prototype.onStop = function() {
    this._stopMediator();
    this._removeRegion();
    return this._destroyContainer();
  };

  TodoModule.prototype._createContainer = function() {
    var node;
    node = document.createElement('div');
    node.id = this.todoRegionId;
    return document.body.appendChild(node);
  };

  TodoModule.prototype._addRegion = function() {
    return this.app.addRegions({
      todoRegion: '#' + this.todoRegionId
    });
  };

  TodoModule.prototype._startMediator = function() {
    var router;
    this.controller = new Controller({
      todoRegion: this.app.todoRegion
    });
    return router = new Router({
      controller: this.controller
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

  TodoModule.prototype._stopMediator = function() {
    return this.controller.stop();
  };

  return TodoModule;

})(Marionette.Module);

module.exports = TodoModule;


},{"./controller":4,"./router":8,"backbone.marionette":false}],8:[function(require,module,exports){
var Marionette = require('backbone.marionette');



module.exports = Marionette.AppRouter.extend({

    // extend AppRouter to tell the controller
    // when the router is ok
    constructor: function(options) {
        Marionette.AppRouter.prototype.constructor.call(this, options);
        this._getController().triggerMethod('start');
    },


    appRoutes: {
        '*filter': 'filterItems'
    }

});
},{"backbone.marionette":false}],9:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "class=\"hidden\"";
  }

  buffer += "<span id=\"todo-count\">\n    ";
  stack1 = (helper = helpers.ngtt || (depth0 && depth0.ngtt),options={hash:{},data:data},helper ? helper.call(depth0, "<strong>%d</strong> item left", "<strong>%d</strong> items left", (depth0 && depth0.activeCount), options) : helperMissing.call(depth0, "ngtt", "<strong>%d</strong> item left", "<strong>%d</strong> items left", (depth0 && depth0.activeCount), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</span>\n<ul id=\"filters\">\n    <li>\n        <a href=\"#\">"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "All", options) : helperMissing.call(depth0, "gtt", "All", options)))
    + "</a>\n    </li>\n    <li>\n        <a href=\"#active\">"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "Active", options) : helperMissing.call(depth0, "gtt", "Active", options)))
    + "</a>\n    </li>\n    <li>\n        <a href=\"#completed\">"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "Completed", options) : helperMissing.call(depth0, "gtt", "Completed", options)))
    + "</a>\n    </li>\n</ul>\n<button id=\"clear-completed\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.completedCount), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    "
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "Clear completed", options) : helperMissing.call(depth0, "gtt", "Clear completed", options)))
    + " (";
  if (helper = helpers.completedCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.completedCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")\n</button>\n";
  return buffer;
  });

},{"hbsfy/runtime":false}],10:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var tpl = require('./footer.hbs');



module.exports = Marionette.ItemView.extend({
    template: tpl,

    ui: {
        filters: '#filters a'
    },

    events: {
        'click #clear-completed': 'onClearClick'
    },

    collectionEvents: {
        'all': 'render'
    },

    // templateHelpers: {
    //     activeCountLabel: (this.activeCount === 1 ? 'item' : 'items') + ' left'
    // },

    serializeData: function () {
        var active = this.collection.getActive().length;
        var total = this.collection.length;

        return {
            activeCount: active,
            totalCount: total,
            completedCount: total - active
        };
    },

    // use onRender only for update after
    // first render / show
    onRender: function() {
        this.update();
    },

    // use onShow rather than onRender because DOM is not ready
    // and this.$el find or parent will return nothing
    onShow: function () {
        this.update();
    },

    onClearClick: function () {
        var completed = this.collection.getCompleted();
        completed.forEach(function (todo) {
            todo.destroy();
        });
    },

    update: function() {
        this.$el.parent().toggle(this.collection.length > 0);
    }

});
},{"./footer.hbs":9,"backbone.marionette":false}],11:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h1>"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "todos", options) : helperMissing.call(depth0, "gtt", "todos", options)))
    + "</h1>\n<form>\n    <input id=\"new-todo\" placeholder=\""
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "What needs to be done?", options) : helperMissing.call(depth0, "gtt", "What needs to be done?", options)))
    + "\" autofocus>\n</form>\n";
  return buffer;
  });

},{"hbsfy/runtime":false}],12:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var tpl = require('./header.hbs');



module.exports = Marionette.ItemView.extend({

    template: tpl,

    ui: {
        input: '#new-todo'
    },

    events: {
        'submit form': 'onSubmit'
    },



    onSubmit: function (e) {
        // prevent form orignal submit
        e.preventDefault();

        var todoText = this.ui.input.val().trim();
        if (todoText) {
            this.collection.create({
                title: todoText
            });
            this.ui.input.val('');
        }
    }

});
},{"./header.hbs":11,"backbone.marionette":false}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<section id=\"todoapp\">\n    <header id=\"header\"></header>\n    <section id=\"main\"></section>\n    <footer id=\"footer\"></footer>\n</section>\n<footer id=\"info\">\n    <p>"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "Double-click to edit a todo", options) : helperMissing.call(depth0, "gtt", "Double-click to edit a todo", options)))
    + "</p>\n    <p>Written by <a href=\"https://github.com/JSteunou\">Jérôme Steunou</a>\n        based on <a href=\"https://github.com/addyosmani\">Addy Osmani TodoMVC project</a><br>\n        and the <a href=\"http://todomvc.com/labs/architecture-examples/backbone_marionette/\">Marionette TodoMVC</a>\n        created by <a href=\"http://github.com/jsoverson\">Jarrod Overson</a>\n        and <a href=\"http://github.com/derickbailey\">Derick Bailey</a>\n    </p>\n</footer>\n";
  return buffer;
  });

},{"hbsfy/runtime":false}],14:[function(require,module,exports){
var Marionette = require('backbone.marionette');


var HeaderView = require('./header/header');
var TodosView = require('../todos/collection');
var FooterView = require('./footer/footer');
var tpl = require('./layout.hbs');



module.exports = Marionette.Layout.extend({
    template: tpl,

    ui: {
        app: '#todoapp'
    },

    regions: {
        header:     '#header',
        main:       '#main',
        footer:     '#footer'
    },



    updateFilter: function(filter) {
        this.ui.app.attr('class', 'filter-' + filter);
    },



    onShow: function() {
        var options = {collection: this.options.todosCollection};

        this.header.show(new HeaderView(options));
        this.main.show(new TodosView(options));
        this.footer.show(new FooterView(options));
    }

});

},{"../todos/collection":16,"./footer/footer":10,"./header/header":12,"./layout.hbs":13,"backbone.marionette":false}],15:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<input id=\"toggle-all\" type=\"checkbox\">\n<label for=\"toggle-all\">"
    + escapeExpression((helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "Mark all as complete", options) : helperMissing.call(depth0, "gtt", "Mark all as complete", options)))
    + "</label>\n<ul id=\"todo-list\"></ul>\n";
  return buffer;
  });

},{"hbsfy/runtime":false}],16:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var TodoItemView = require('./item');
var tpl = require('./collection.hbs');



// Item List View
// --------------
//
// Controls the rendering of the list of items, including the
// filtering of activs vs completed items for display.
module.exports = Marionette.CompositeView.extend({
    template: tpl,
    itemView: TodoItemView,
    itemViewContainer: '#todo-list',

    ui: {
        toggle: '#toggle-all'
    },

    events: {
        'click @ui.toggle': 'onToggleAllClick'
    },

    collectionEvents: {
        'all': 'update'
    },


    // use onShow rather than onRender because DOM is not ready
    // and this.$el find or parent will return nothing
    onShow: function () {
        this.update();
    },

    update: function () {
        function reduceCompleted(left, right) {
            return left && right.get('completed');
        }

        var allCompleted = this.collection.reduce(reduceCompleted, true);

        this.ui.toggle.prop('checked', allCompleted);
        this.$el.parent().toggle(!!this.collection.length);
    },

    onToggleAllClick: function (e) {
        var isChecked = e.currentTarget.checked;

        this.collection.each(function (todo) {
            todo.save({ 'completed': isChecked });
        });
    }

});

},{"./collection.hbs":15,"./item":18,"backbone.marionette":false}],17:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "checked";
  }

  buffer += "<div class=\"view\">\n    <input class=\"toggle\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.completed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <label>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n    <button class=\"destroy\"></button>\n</div>\n<input class=\"edit\" value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  return buffer;
  });

},{"hbsfy/runtime":false}],18:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var tpl = require('./item.hbs');



// Todo List Item View
// -------------------
//
// Display an individual todo item, and respond to changes
// that are made to the item, including marking completed.
module.exports = Marionette.ItemView.extend({
    tagName: 'li',
    template: tpl,

    ui: {
        edit: '.edit'
    },

    events: {
        'click .destroy':       'destroy',
        'click .toggle':        'toggle',
        'dblclick label':       'onEditClick',
        'keydown  @ui.edit':    'onEditKeypress',
        'focusout @ui.edit':    'onEditFocusout'
    },

    modelEvents: {
        'change': 'render'
    },

    onRender: function () {
        this.$el.removeClass('active completed');

        if (this.model.get('completed')) {
            this.$el.addClass('completed');
        } else {
            this.$el.addClass('active');
        }
    },

    destroy: function () {
        this.model.destroy();
    },

    toggle: function () {
        this.model.toggle().save();
    },

    onEditClick: function () {
        this.$el.addClass('editing');
        this.ui.edit.focus();
        this.ui.edit.val(this.ui.edit.val());
    },

    onEditFocusout: function () {
        var todoText = this.ui.edit.val().trim();
        if (todoText) {
            this.model.set('title', todoText).save();
            this.$el.removeClass('editing');
        } else {
            this.destroy();
        }
    },

    onEditKeypress: function (e) {
        var ENTER_KEY = 13, ESC_KEY = 27;

        if (e.which === ENTER_KEY) {
            this.onEditFocusout();
            return;
        }

        if (e.which === ESC_KEY) {
            this.ui.edit.val(this.model.get('title'));
            this.$el.removeClass('editing');
        }
    }
});


},{"./item.hbs":17,"backbone.marionette":false}],19:[function(require,module,exports){
var Jed = require('jed');
var _ = require('underscore');


var languageService = require('./language');



var pojson = require('./translations/' + languageService.get());
var jedi18n = new Jed(pojson);
_.bindAll(jedi18n, 'gettext', 'ngettext');

// Jed gettext proxy to be able to call it directly
// or call specialized methods
function gettext(singular) {
    return jedi18n.gettext(singular);
}
gettext.gettext  = jedi18n.gettext;
gettext.ngettext = function(singular, plural, n) {
    return Jed.sprintf(jedi18n.ngettext(singular, plural, n), n);
};


module.exports = gettext;

},{"./language":20,"jed":false,"underscore":false}],20:[function(require,module,exports){
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

},{"../config":2,"underscore":false}],"./translations/en":[function(require,module,exports){
module.exports=require('YjP5xR');
},{}],"YjP5xR":[function(require,module,exports){
module.exports={"domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural_forms":"nplurals=2; plural=(n != 1);","lang":"en"},"<strong>%d</strong> item left":["<strong>%d</strong> items left","",""],"All":[null,""],"Active":[null,""],"Completed":[null,""],"Clear completed":[null,""],"todos":[null,""],"What needs to be done?":[null,""],"Double-click to edit a todo":[null,""],"Mark all as complete":[null,""]}}}
},{}],"./translations/fr":[function(require,module,exports){
module.exports=require('FLnUtU');
},{}],"FLnUtU":[function(require,module,exports){
module.exports={"domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural_forms":"nplurals=2; plural=(n > 1);","lang":"fr"},"<strong>%d</strong> item left":["<strong>%d</strong> items left","<strong>%d</strong> tâche restante","<strong>%d</strong> tâches restantes"],"All":[null,"Tous"],"Active":[null,"En cours"],"Completed":[null,"Terminés"],"Clear completed":[null,"Effacer les terminés"],"todos":[null,"todos"],"What needs to be done?":[null,"Qu'est-ce qui est à faire ?"],"Double-click to edit a todo":[null,"Double clic pour éditer un todo"],"Mark all as complete":[null,"Tout clôturer"]}}}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL2FwcC5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9jb25maWcuanNvbiIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9oZWxwZXJzL2dldHRleHQuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL2NvbnRyb2xsZXIuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL21vZGVscy90b2RvLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby9tb2RlbHMvdG9kb3MuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL21vZHVsZS5jb2ZmZWUiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3JvdXRlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2Zvb3Rlci9mb290ZXIuaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy9sYXlvdXQvZm9vdGVyL2Zvb3Rlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2hlYWRlci9oZWFkZXIuaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy9sYXlvdXQvaGVhZGVyL2hlYWRlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2xheW91dC5oYnMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3ZpZXdzL2xheW91dC9sYXlvdXQuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3ZpZXdzL3RvZG9zL2NvbGxlY3Rpb24uaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy90b2Rvcy9jb2xsZWN0aW9uLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy90b2Rvcy9pdGVtLmhicyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvdG9kb3MvaXRlbS5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9zZXJ2aWNlcy9qZWRpMThuLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL3NlcnZpY2VzL2xhbmd1YWdlLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvdHJhbnNsYXRpb25zL2VuLmpzb24iLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS90cmFuc2xhdGlvbnMvZnIuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7Ozs7QUNBQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gVmVuZG9yc1xudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyk7XG5CYWNrYm9uZS4kID0gJDtcbnZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpO1xuXG5cbi8vIExvY2FsXG5yZXF1aXJlKCcuL2hlbHBlcnMvZ2V0dGV4dCcpO1xudmFyIFRvZG9Nb2R1bGUgPSByZXF1aXJlKCcuL21vZHVsZXMvdG9kby9tb2R1bGUnKTtcblxuXG5cbi8vIGFwcCBib290c3RyYXBcbnZhciBhcHAgPSBuZXcgTWFyaW9uZXR0ZS5BcHBsaWNhdGlvbigpO1xuYXBwLm1vZHVsZSgndG9kbycsIFRvZG9Nb2R1bGUpO1xuYXBwLnN0YXJ0KCk7XG5CYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcDtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBcImxhbmd1YWdlc1wiOiBbXG4gICAgICAgIFwiZW5cIixcbiAgICAgICAgXCJmclwiXG4gICAgXSxcbiAgICBcImRlZmF1bHRMYW5ndWFnZVwiOiBcImZyXCJcbn1cbiIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcImhic2Z5L3J1bnRpbWVcIik7XG52YXIgSmVkID0gcmVxdWlyZSgnamVkJyk7XG5cbnZhciBqZWRpMThuID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2plZGkxOG5cIik7XG5cblxuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKFwiZ3R0XCIsIGplZGkxOG4pO1xuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihcIm5ndHRcIiwgamVkaTE4bi5uZ2V0dGV4dCk7XG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxudmFyIFRvZG9MYXlvdXQgPSByZXF1aXJlKCcuL3ZpZXdzL2xheW91dC9sYXlvdXQnKTtcbnZhciBUb2Rvc0NvbGxlY3Rpb24gPSByZXF1aXJlKCcuL21vZGVscy90b2RvcycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkNvbnRyb2xsZXIuZXh0ZW5kKHtcblxuICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRvZG9zQ29sbGVjdGlvbiA9IG5ldyBUb2Rvc0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy50b2Rvc0xheW91dCA9IG5ldyBUb2RvTGF5b3V0KHt0b2Rvc0NvbGxlY3Rpb246IHRoaXMudG9kb3NDb2xsZWN0aW9ufSk7XG5cbiAgICAgICAgdmFyIG9uU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnRvZG9SZWdpb24uc2hvdyh0aGlzLnRvZG9zTGF5b3V0KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRvZG9zQ29sbGVjdGlvbi5mZXRjaCh7c3VjY2Vzczogb25TdWNjZXNzfSk7XG4gICAgfSxcblxuXG4gICAgZmlsdGVySXRlbXM6IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgICAgICBmaWx0ZXIgPSAoZmlsdGVyICYmIGZpbHRlci50cmltKCkgfHwgJ2FsbCcpO1xuICAgICAgICB0aGlzLnRvZG9zTGF5b3V0LnVwZGF0ZUZpbHRlcihmaWx0ZXIpO1xuICAgIH1cblxufSk7XG4iLCJ2YXIgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICBjcmVhdGVkOiAwXG4gICAgfSxcblxuXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTmV3KCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KCdjcmVhdGVkJywgRGF0ZS5ub3coKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgnY29tcGxldGVkJywgIXRoaXMuaXNDb21wbGV0ZWQoKSk7XG4gICAgfSxcblxuICAgIGlzQ29tcGxldGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnY29tcGxldGVkJyk7XG4gICAgfVxuXG59KTsiLCJ2YXIgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpO1xuQmFja2JvbmUuTG9jYWxTdG9yYWdlID0gcmVxdWlyZShcImJhY2tib25lLmxvY2Fsc3RvcmFnZVwiKTtcblxudmFyIFRvZG9Nb2RlbCA9IHJlcXVpcmUoJy4vdG9kbycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG5cbiAgICBtb2RlbDogVG9kb01vZGVsLFxuXG4gICAgbG9jYWxTdG9yYWdlOiBuZXcgQmFja2JvbmUuTG9jYWxTdG9yYWdlKCd0b2Rvcy1iYWNrYm9uZS1tYXJpb25ldHRlLWJyb3dzZXJpZnknKSxcblxuXG5cbiAgICBnZXRDb21wbGV0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuX2lzQ29tcGxldGVkKTtcbiAgICB9LFxuXG4gICAgZ2V0QWN0aXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlamVjdCh0aGlzLl9pc0NvbXBsZXRlZCk7XG4gICAgfSxcblxuICAgIGNvbXBhcmF0b3I6IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgICAgIHJldHVybiB0b2RvLmdldCgnY3JlYXRlZCcpO1xuICAgIH0sXG5cblxuXG4gICAgX2lzQ29tcGxldGVkOiBmdW5jdGlvbiAodG9kbykge1xuICAgICAgICByZXR1cm4gdG9kby5pc0NvbXBsZXRlZCgpO1xuICAgIH1cblxufSk7IiwiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cblJvdXRlciA9IHJlcXVpcmUgJy4vcm91dGVyJ1xuQ29udHJvbGxlciA9IHJlcXVpcmUgJy4vY29udHJvbGxlcidcblxuXG5cbmNsYXNzIFRvZG9Nb2R1bGUgZXh0ZW5kcyBNYXJpb25ldHRlLk1vZHVsZVxuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgdGhpcy50b2RvUmVnaW9uSWQgPSAndG9kby1tb2R1bGUtcmVnaW9uJ1xuXG5cbiAgICBvblN0YXJ0OiAtPlxuICAgICAgICAjIGVuY2Fwc3VsYXRlIGVhY2ggbW9kdWxlIGluIGEgY29udGFpbmVyXG4gICAgICAgICMgc28geW91IGNhbiBkbyB3aGF0IHlvdSB3YW50IHdpdGhvdXRcbiAgICAgICAgIyBhZmZlY3Rpbmcgb3RoZXIgbW9kdWxlc1xuICAgICAgICB0aGlzLl9jcmVhdGVDb250YWluZXIoKVxuICAgICAgICB0aGlzLl9hZGRSZWdpb24oKVxuICAgICAgICB0aGlzLl9zdGFydE1lZGlhdG9yKClcblxuICAgIG9uU3RvcDogLT5cbiAgICAgICAgIyByZW1vdmUgcmVnaW9uICYgY29udGFpbmVyIHdoZW4gc3RvcHBpbmdcbiAgICAgICAgIyB1bmxvYWQgb2YgbW9kdWxlIGNvdWxkIGJlIGltcG9ydGFudCBpbiBiaWcgYXBwIC8gbW9kdWxlc1xuICAgICAgICB0aGlzLl9zdG9wTWVkaWF0b3IoKVxuICAgICAgICB0aGlzLl9yZW1vdmVSZWdpb24oKVxuICAgICAgICB0aGlzLl9kZXN0cm95Q29udGFpbmVyKClcblxuXG5cbiAgICBfY3JlYXRlQ29udGFpbmVyOiAtPlxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICBub2RlLmlkID0gdGhpcy50b2RvUmVnaW9uSWRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBub2RlXG5cbiAgICBfYWRkUmVnaW9uOiAtPlxuICAgICAgICB0aGlzLmFwcC5hZGRSZWdpb25zIHRvZG9SZWdpb246ICcjJyArIHRoaXMudG9kb1JlZ2lvbklkXG5cbiAgICBfc3RhcnRNZWRpYXRvcjogLT5cbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIgdG9kb1JlZ2lvbjogdGhpcy5hcHAudG9kb1JlZ2lvblxuICAgICAgICByb3V0ZXIgPSBuZXcgUm91dGVyIGNvbnRyb2xsZXI6IHRoaXMuY29udHJvbGxlclxuXG5cblxuXG4gICAgX2Rlc3Ryb3lDb250YWluZXI6IC0+XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCB0aGlzLnRvZG9SZWdpb25JZFxuICAgICAgICBub2RlPy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkIG5vZGVcblxuICAgIF9yZW1vdmVSZWdpb246IC0+XG4gICAgICAgIHRoaXMuYXBwLnJlbW92ZVJlZ2lvbiAndG9kb1JlZ2lvbidcblxuICAgIF9zdG9wTWVkaWF0b3I6IC0+XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5zdG9wKClcblxuXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gVG9kb01vZHVsZVxuXG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFyaW9uZXR0ZS5BcHBSb3V0ZXIuZXh0ZW5kKHtcblxuICAgIC8vIGV4dGVuZCBBcHBSb3V0ZXIgdG8gdGVsbCB0aGUgY29udHJvbGxlclxuICAgIC8vIHdoZW4gdGhlIHJvdXRlciBpcyBva1xuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIE1hcmlvbmV0dGUuQXBwUm91dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9nZXRDb250cm9sbGVyKCkudHJpZ2dlck1ldGhvZCgnc3RhcnQnKTtcbiAgICB9LFxuXG5cbiAgICBhcHBSb3V0ZXM6IHtcbiAgICAgICAgJypmaWx0ZXInOiAnZmlsdGVySXRlbXMnXG4gICAgfVxuXG59KTsiLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFycy50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIHN0YWNrMSwgaGVscGVyLCBvcHRpb25zLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcywgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIjtcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIFxuICByZXR1cm4gXCJjbGFzcz1cXFwiaGlkZGVuXFxcIlwiO1xuICB9XG5cbiAgYnVmZmVyICs9IFwiPHNwYW4gaWQ9XFxcInRvZG8tY291bnRcXFwiPlxcbiAgICBcIjtcbiAgc3RhY2sxID0gKGhlbHBlciA9IGhlbHBlcnMubmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5uZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbSBsZWZ0XCIsIFwiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtcyBsZWZ0XCIsIChkZXB0aDAgJiYgZGVwdGgwLmFjdGl2ZUNvdW50KSwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcIm5ndHRcIiwgXCI8c3Ryb25nPiVkPC9zdHJvbmc+IGl0ZW0gbGVmdFwiLCBcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbXMgbGVmdFwiLCAoZGVwdGgwICYmIGRlcHRoMC5hY3RpdmVDb3VudCksIG9wdGlvbnMpKTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcbjwvc3Bhbj5cXG48dWwgaWQ9XFxcImZpbHRlcnNcXFwiPlxcbiAgICA8bGk+XFxuICAgICAgICA8YSBocmVmPVxcXCIjXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIkFsbFwiLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZ3R0XCIsIFwiQWxsXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiPC9hPlxcbiAgICA8L2xpPlxcbiAgICA8bGk+XFxuICAgICAgICA8YSBocmVmPVxcXCIjYWN0aXZlXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIkFjdGl2ZVwiLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZ3R0XCIsIFwiQWN0aXZlXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiPC9hPlxcbiAgICA8L2xpPlxcbiAgICA8bGk+XFxuICAgICAgICA8YSBocmVmPVxcXCIjY29tcGxldGVkXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIkNvbXBsZXRlZFwiLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZ3R0XCIsIFwiQ29tcGxldGVkXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiPC9hPlxcbiAgICA8L2xpPlxcbjwvdWw+XFxuPGJ1dHRvbiBpZD1cXFwiY2xlYXItY29tcGxldGVkXFxcIiBcIjtcbiAgc3RhY2sxID0gaGVscGVycy51bmxlc3MuY2FsbChkZXB0aDAsIChkZXB0aDAgJiYgZGVwdGgwLmNvbXBsZXRlZENvdW50KSwge2hhc2g6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIj5cXG4gICAgXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnMuZ3R0IHx8IChkZXB0aDAgJiYgZGVwdGgwLmd0dCksb3B0aW9ucz17aGFzaDp7fSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgXCJDbGVhciBjb21wbGV0ZWRcIiwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcIkNsZWFyIGNvbXBsZXRlZFwiLCBvcHRpb25zKSkpXG4gICAgKyBcIiAoXCI7XG4gIGlmIChoZWxwZXIgPSBoZWxwZXJzLmNvbXBsZXRlZENvdW50KSB7IHN0YWNrMSA9IGhlbHBlci5jYWxsKGRlcHRoMCwge2hhc2g6e30sZGF0YTpkYXRhfSk7IH1cbiAgZWxzZSB7IGhlbHBlciA9IChkZXB0aDAgJiYgZGVwdGgwLmNvbXBsZXRlZENvdW50KTsgc3RhY2sxID0gdHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KSA6IGhlbHBlcjsgfVxuICBidWZmZXIgKz0gZXNjYXBlRXhwcmVzc2lvbihzdGFjazEpXG4gICAgKyBcIilcXG48L2J1dHRvbj5cXG5cIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfSk7XG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxudmFyIHRwbCA9IHJlcXVpcmUoJy4vZm9vdGVyLmhicycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IHRwbCxcblxuICAgIHVpOiB7XG4gICAgICAgIGZpbHRlcnM6ICcjZmlsdGVycyBhJ1xuICAgIH0sXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrICNjbGVhci1jb21wbGV0ZWQnOiAnb25DbGVhckNsaWNrJ1xuICAgIH0sXG5cbiAgICBjb2xsZWN0aW9uRXZlbnRzOiB7XG4gICAgICAgICdhbGwnOiAncmVuZGVyJ1xuICAgIH0sXG5cbiAgICAvLyB0ZW1wbGF0ZUhlbHBlcnM6IHtcbiAgICAvLyAgICAgYWN0aXZlQ291bnRMYWJlbDogKHRoaXMuYWN0aXZlQ291bnQgPT09IDEgPyAnaXRlbScgOiAnaXRlbXMnKSArICcgbGVmdCdcbiAgICAvLyB9LFxuXG4gICAgc2VyaWFsaXplRGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5jb2xsZWN0aW9uLmdldEFjdGl2ZSgpLmxlbmd0aDtcbiAgICAgICAgdmFyIHRvdGFsID0gdGhpcy5jb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlQ291bnQ6IGFjdGl2ZSxcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IHRvdGFsLFxuICAgICAgICAgICAgY29tcGxldGVkQ291bnQ6IHRvdGFsIC0gYWN0aXZlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8vIHVzZSBvblJlbmRlciBvbmx5IGZvciB1cGRhdGUgYWZ0ZXJcbiAgICAvLyBmaXJzdCByZW5kZXIgLyBzaG93XG4gICAgb25SZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyB1c2Ugb25TaG93IHJhdGhlciB0aGFuIG9uUmVuZGVyIGJlY2F1c2UgRE9NIGlzIG5vdCByZWFkeVxuICAgIC8vIGFuZCB0aGlzLiRlbCBmaW5kIG9yIHBhcmVudCB3aWxsIHJldHVybiBub3RoaW5nXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSxcblxuICAgIG9uQ2xlYXJDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gdGhpcy5jb2xsZWN0aW9uLmdldENvbXBsZXRlZCgpO1xuICAgICAgICBjb21wbGV0ZWQuZm9yRWFjaChmdW5jdGlvbiAodG9kbykge1xuICAgICAgICAgICAgdG9kby5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRlbC5wYXJlbnQoKS50b2dnbGUodGhpcy5jb2xsZWN0aW9uLmxlbmd0aCA+IDApO1xuICAgIH1cblxufSk7IiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnMudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSBcIlwiLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcblxuXG4gIGJ1ZmZlciArPSBcIjxoMT5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcInRvZG9zXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJ0b2Rvc1wiLCBvcHRpb25zKSkpXG4gICAgKyBcIjwvaDE+XFxuPGZvcm0+XFxuICAgIDxpbnB1dCBpZD1cXFwibmV3LXRvZG9cXFwiIHBsYWNlaG9sZGVyPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIiwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIiwgb3B0aW9ucykpKVxuICAgICsgXCJcXFwiIGF1dG9mb2N1cz5cXG48L2Zvcm0+XFxuXCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH0pO1xuIiwidmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyk7XG5cbnZhciB0cGwgPSByZXF1aXJlKCcuL2hlYWRlci5oYnMnKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuXG4gICAgdGVtcGxhdGU6IHRwbCxcblxuICAgIHVpOiB7XG4gICAgICAgIGlucHV0OiAnI25ldy10b2RvJ1xuICAgIH0sXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ3N1Ym1pdCBmb3JtJzogJ29uU3VibWl0J1xuICAgIH0sXG5cblxuXG4gICAgb25TdWJtaXQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIHByZXZlbnQgZm9ybSBvcmlnbmFsIHN1Ym1pdFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIHRvZG9UZXh0ID0gdGhpcy51aS5pbnB1dC52YWwoKS50cmltKCk7XG4gICAgICAgIGlmICh0b2RvVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRvZG9UZXh0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudWkuaW5wdXQudmFsKCcnKTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7IiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnMudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSBcIlwiLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcblxuXG4gIGJ1ZmZlciArPSBcIjxzZWN0aW9uIGlkPVxcXCJ0b2RvYXBwXFxcIj5cXG4gICAgPGhlYWRlciBpZD1cXFwiaGVhZGVyXFxcIj48L2hlYWRlcj5cXG4gICAgPHNlY3Rpb24gaWQ9XFxcIm1haW5cXFwiPjwvc2VjdGlvbj5cXG4gICAgPGZvb3RlciBpZD1cXFwiZm9vdGVyXFxcIj48L2Zvb3Rlcj5cXG48L3NlY3Rpb24+XFxuPGZvb3RlciBpZD1cXFwiaW5mb1xcXCI+XFxuICAgIDxwPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiRG91YmxlLWNsaWNrIHRvIGVkaXQgYSB0b2RvXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJEb3VibGUtY2xpY2sgdG8gZWRpdCBhIHRvZG9cIiwgb3B0aW9ucykpKVxuICAgICsgXCI8L3A+XFxuICAgIDxwPldyaXR0ZW4gYnkgPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL0pTdGV1bm91XFxcIj5Kw6lyw7RtZSBTdGV1bm91PC9hPlxcbiAgICAgICAgYmFzZWQgb24gPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL2FkZHlvc21hbmlcXFwiPkFkZHkgT3NtYW5pIFRvZG9NVkMgcHJvamVjdDwvYT48YnI+XFxuICAgICAgICBhbmQgdGhlIDxhIGhyZWY9XFxcImh0dHA6Ly90b2RvbXZjLmNvbS9sYWJzL2FyY2hpdGVjdHVyZS1leGFtcGxlcy9iYWNrYm9uZV9tYXJpb25ldHRlL1xcXCI+TWFyaW9uZXR0ZSBUb2RvTVZDPC9hPlxcbiAgICAgICAgY3JlYXRlZCBieSA8YSBocmVmPVxcXCJodHRwOi8vZ2l0aHViLmNvbS9qc292ZXJzb25cXFwiPkphcnJvZCBPdmVyc29uPC9hPlxcbiAgICAgICAgYW5kIDxhIGhyZWY9XFxcImh0dHA6Ly9naXRodWIuY29tL2Rlcmlja2JhaWxleVxcXCI+RGVyaWNrIEJhaWxleTwvYT5cXG4gICAgPC9wPlxcbjwvZm9vdGVyPlxcblwiO1xuICByZXR1cm4gYnVmZmVyO1xuICB9KTtcbiIsInZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpO1xuXG5cbnZhciBIZWFkZXJWaWV3ID0gcmVxdWlyZSgnLi9oZWFkZXIvaGVhZGVyJyk7XG52YXIgVG9kb3NWaWV3ID0gcmVxdWlyZSgnLi4vdG9kb3MvY29sbGVjdGlvbicpO1xudmFyIEZvb3RlclZpZXcgPSByZXF1aXJlKCcuL2Zvb3Rlci9mb290ZXInKTtcbnZhciB0cGwgPSByZXF1aXJlKCcuL2xheW91dC5oYnMnKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFyaW9uZXR0ZS5MYXlvdXQuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogdHBsLFxuXG4gICAgdWk6IHtcbiAgICAgICAgYXBwOiAnI3RvZG9hcHAnXG4gICAgfSxcblxuICAgIHJlZ2lvbnM6IHtcbiAgICAgICAgaGVhZGVyOiAgICAgJyNoZWFkZXInLFxuICAgICAgICBtYWluOiAgICAgICAnI21haW4nLFxuICAgICAgICBmb290ZXI6ICAgICAnI2Zvb3RlcidcbiAgICB9LFxuXG5cblxuICAgIHVwZGF0ZUZpbHRlcjogZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgIHRoaXMudWkuYXBwLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlci0nICsgZmlsdGVyKTtcbiAgICB9LFxuXG5cblxuICAgIG9uU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge2NvbGxlY3Rpb246IHRoaXMub3B0aW9ucy50b2Rvc0NvbGxlY3Rpb259O1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnNob3cobmV3IEhlYWRlclZpZXcob3B0aW9ucykpO1xuICAgICAgICB0aGlzLm1haW4uc2hvdyhuZXcgVG9kb3NWaWV3KG9wdGlvbnMpKTtcbiAgICAgICAgdGhpcy5mb290ZXIuc2hvdyhuZXcgRm9vdGVyVmlldyhvcHRpb25zKSk7XG4gICAgfVxuXG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gXCJcIiwgaGVscGVyLCBvcHRpb25zLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG5cblxuICBidWZmZXIgKz0gXCI8aW5wdXQgaWQ9XFxcInRvZ2dsZS1hbGxcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIj5cXG48bGFiZWwgZm9yPVxcXCJ0b2dnbGUtYWxsXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIk1hcmsgYWxsIGFzIGNvbXBsZXRlXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVwiLCBvcHRpb25zKSkpXG4gICAgKyBcIjwvbGFiZWw+XFxuPHVsIGlkPVxcXCJ0b2RvLWxpc3RcXFwiPjwvdWw+XFxuXCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH0pO1xuIiwidmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyk7XG5cbnZhciBUb2RvSXRlbVZpZXcgPSByZXF1aXJlKCcuL2l0ZW0nKTtcbnZhciB0cGwgPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24uaGJzJyk7XG5cblxuXG4vLyBJdGVtIExpc3QgVmlld1xuLy8gLS0tLS0tLS0tLS0tLS1cbi8vXG4vLyBDb250cm9scyB0aGUgcmVuZGVyaW5nIG9mIHRoZSBsaXN0IG9mIGl0ZW1zLCBpbmNsdWRpbmcgdGhlXG4vLyBmaWx0ZXJpbmcgb2YgYWN0aXZzIHZzIGNvbXBsZXRlZCBpdGVtcyBmb3IgZGlzcGxheS5cbm1vZHVsZS5leHBvcnRzID0gTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IHRwbCxcbiAgICBpdGVtVmlldzogVG9kb0l0ZW1WaWV3LFxuICAgIGl0ZW1WaWV3Q29udGFpbmVyOiAnI3RvZG8tbGlzdCcsXG5cbiAgICB1aToge1xuICAgICAgICB0b2dnbGU6ICcjdG9nZ2xlLWFsbCdcbiAgICB9LFxuXG4gICAgZXZlbnRzOiB7XG4gICAgICAgICdjbGljayBAdWkudG9nZ2xlJzogJ29uVG9nZ2xlQWxsQ2xpY2snXG4gICAgfSxcblxuICAgIGNvbGxlY3Rpb25FdmVudHM6IHtcbiAgICAgICAgJ2FsbCc6ICd1cGRhdGUnXG4gICAgfSxcblxuXG4gICAgLy8gdXNlIG9uU2hvdyByYXRoZXIgdGhhbiBvblJlbmRlciBiZWNhdXNlIERPTSBpcyBub3QgcmVhZHlcbiAgICAvLyBhbmQgdGhpcy4kZWwgZmluZCBvciBwYXJlbnQgd2lsbCByZXR1cm4gbm90aGluZ1xuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gcmVkdWNlQ29tcGxldGVkKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdCAmJiByaWdodC5nZXQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFsbENvbXBsZXRlZCA9IHRoaXMuY29sbGVjdGlvbi5yZWR1Y2UocmVkdWNlQ29tcGxldGVkLCB0cnVlKTtcblxuICAgICAgICB0aGlzLnVpLnRvZ2dsZS5wcm9wKCdjaGVja2VkJywgYWxsQ29tcGxldGVkKTtcbiAgICAgICAgdGhpcy4kZWwucGFyZW50KCkudG9nZ2xlKCEhdGhpcy5jb2xsZWN0aW9uLmxlbmd0aCk7XG4gICAgfSxcblxuICAgIG9uVG9nZ2xlQWxsQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBpc0NoZWNrZWQgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZDtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZWFjaChmdW5jdGlvbiAodG9kbykge1xuICAgICAgICAgICAgdG9kby5zYXZlKHsgJ2NvbXBsZXRlZCc6IGlzQ2hlY2tlZCB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gXCJcIiwgc3RhY2sxLCBoZWxwZXIsIHNlbGY9dGhpcywgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICBcbiAgcmV0dXJuIFwiY2hlY2tlZFwiO1xuICB9XG5cbiAgYnVmZmVyICs9IFwiPGRpdiBjbGFzcz1cXFwidmlld1xcXCI+XFxuICAgIDxpbnB1dCBjbGFzcz1cXFwidG9nZ2xlXFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCIgXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIChkZXB0aDAgJiYgZGVwdGgwLmNvbXBsZXRlZCksIHtoYXNoOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICBidWZmZXIgKz0gXCI+XFxuICAgIDxsYWJlbD5cIjtcbiAgaWYgKGhlbHBlciA9IGhlbHBlcnMudGl0bGUpIHsgc3RhY2sxID0gaGVscGVyLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KTsgfVxuICBlbHNlIHsgaGVscGVyID0gKGRlcHRoMCAmJiBkZXB0aDAudGl0bGUpOyBzdGFjazEgPSB0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pIDogaGVscGVyOyB9XG4gIGJ1ZmZlciArPSBlc2NhcGVFeHByZXNzaW9uKHN0YWNrMSlcbiAgICArIFwiPC9sYWJlbD5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cXFwiZGVzdHJveVxcXCI+PC9idXR0b24+XFxuPC9kaXY+XFxuPGlucHV0IGNsYXNzPVxcXCJlZGl0XFxcIiB2YWx1ZT1cXFwiXCI7XG4gIGlmIChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlKSB7IHN0YWNrMSA9IGhlbHBlci5jYWxsKGRlcHRoMCwge2hhc2g6e30sZGF0YTpkYXRhfSk7IH1cbiAgZWxzZSB7IGhlbHBlciA9IChkZXB0aDAgJiYgZGVwdGgwLnRpdGxlKTsgc3RhY2sxID0gdHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KSA6IGhlbHBlcjsgfVxuICBidWZmZXIgKz0gZXNjYXBlRXhwcmVzc2lvbihzdGFjazEpXG4gICAgKyBcIlxcXCI+XCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH0pO1xuIiwidmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyk7XG5cbnZhciB0cGwgPSByZXF1aXJlKCcuL2l0ZW0uaGJzJyk7XG5cblxuXG4vLyBUb2RvIExpc3QgSXRlbSBWaWV3XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1xuLy8gRGlzcGxheSBhbiBpbmRpdmlkdWFsIHRvZG8gaXRlbSwgYW5kIHJlc3BvbmQgdG8gY2hhbmdlc1xuLy8gdGhhdCBhcmUgbWFkZSB0byB0aGUgaXRlbSwgaW5jbHVkaW5nIG1hcmtpbmcgY29tcGxldGVkLlxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogJ2xpJyxcbiAgICB0ZW1wbGF0ZTogdHBsLFxuXG4gICAgdWk6IHtcbiAgICAgICAgZWRpdDogJy5lZGl0J1xuICAgIH0sXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIC5kZXN0cm95JzogICAgICAgJ2Rlc3Ryb3knLFxuICAgICAgICAnY2xpY2sgLnRvZ2dsZSc6ICAgICAgICAndG9nZ2xlJyxcbiAgICAgICAgJ2RibGNsaWNrIGxhYmVsJzogICAgICAgJ29uRWRpdENsaWNrJyxcbiAgICAgICAgJ2tleWRvd24gIEB1aS5lZGl0JzogICAgJ29uRWRpdEtleXByZXNzJyxcbiAgICAgICAgJ2ZvY3Vzb3V0IEB1aS5lZGl0JzogICAgJ29uRWRpdEZvY3Vzb3V0J1xuICAgIH0sXG5cbiAgICBtb2RlbEV2ZW50czoge1xuICAgICAgICAnY2hhbmdlJzogJ3JlbmRlcidcbiAgICB9LFxuXG4gICAgb25SZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBjb21wbGV0ZWQnKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXQoJ2NvbXBsZXRlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubW9kZWwudG9nZ2xlKCkuc2F2ZSgpO1xuICAgIH0sXG5cbiAgICBvbkVkaXRDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygnZWRpdGluZycpO1xuICAgICAgICB0aGlzLnVpLmVkaXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy51aS5lZGl0LnZhbCh0aGlzLnVpLmVkaXQudmFsKCkpO1xuICAgIH0sXG5cbiAgICBvbkVkaXRGb2N1c291dDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9kb1RleHQgPSB0aGlzLnVpLmVkaXQudmFsKCkudHJpbSgpO1xuICAgICAgICBpZiAodG9kb1RleHQpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2V0KCd0aXRsZScsIHRvZG9UZXh0KS5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZWRpdGluZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FZGl0S2V5cHJlc3M6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBFTlRFUl9LRVkgPSAxMywgRVNDX0tFWSA9IDI3O1xuXG4gICAgICAgIGlmIChlLndoaWNoID09PSBFTlRFUl9LRVkpIHtcbiAgICAgICAgICAgIHRoaXMub25FZGl0Rm9jdXNvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLndoaWNoID09PSBFU0NfS0VZKSB7XG4gICAgICAgICAgICB0aGlzLnVpLmVkaXQudmFsKHRoaXMubW9kZWwuZ2V0KCd0aXRsZScpKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdlZGl0aW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuIiwidmFyIEplZCA9IHJlcXVpcmUoJ2plZCcpO1xudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG5cblxudmFyIGxhbmd1YWdlU2VydmljZSA9IHJlcXVpcmUoJy4vbGFuZ3VhZ2UnKTtcblxuXG5cbnZhciBwb2pzb24gPSByZXF1aXJlKCcuL3RyYW5zbGF0aW9ucy8nICsgbGFuZ3VhZ2VTZXJ2aWNlLmdldCgpKTtcbnZhciBqZWRpMThuID0gbmV3IEplZChwb2pzb24pO1xuXy5iaW5kQWxsKGplZGkxOG4sICdnZXR0ZXh0JywgJ25nZXR0ZXh0Jyk7XG5cbi8vIEplZCBnZXR0ZXh0IHByb3h5IHRvIGJlIGFibGUgdG8gY2FsbCBpdCBkaXJlY3RseVxuLy8gb3IgY2FsbCBzcGVjaWFsaXplZCBtZXRob2RzXG5mdW5jdGlvbiBnZXR0ZXh0KHNpbmd1bGFyKSB7XG4gICAgcmV0dXJuIGplZGkxOG4uZ2V0dGV4dChzaW5ndWxhcik7XG59XG5nZXR0ZXh0LmdldHRleHQgID0gamVkaTE4bi5nZXR0ZXh0O1xuZ2V0dGV4dC5uZ2V0dGV4dCA9IGZ1bmN0aW9uKHNpbmd1bGFyLCBwbHVyYWwsIG4pIHtcbiAgICByZXR1cm4gSmVkLnNwcmludGYoamVkaTE4bi5uZ2V0dGV4dChzaW5ndWxhciwgcGx1cmFsLCBuKSwgbik7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0dGV4dDtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuXG5cbnZhciBMU19LRVkgPSAnbWFyaW9uZXR0ZWlmeS1sbmcnO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBsYW5ndWFnZSBjb2RlIGlzIGluIHRoZSBsaXN0XG4gKiBvZiBjb25maWd1cmF0aW9uIGxhbmd1YWdlcyBsaXN0XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBsbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihsbmcpIHtcbiAgICAvLyBubyBBcnJheS5pbmRleE9mIG9uIElFOFxuICAgIHJldHVybiBfLmluZGV4T2YoY29uZmlnLmxhbmd1YWdlcywgbG5nKSA+IC0xO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGZ1bmN0aW9uKGxuZykge1xuICAgIHJldHVybiAobG5nICYmIGxuZy5zbGljZSkgPyBsbmcuc2xpY2UoMCwgMikgOiAnJztcbn07XG5cblxudmFyIGxhbmd1YWdlID0ge1xuXG4gICAgc2V0OiBmdW5jdGlvbihsbmcpIHtcbiAgICAgICAgbG5nID0gbm9ybWFsaXplKGxuZyk7XG4gICAgICAgIGlmIChpc0F1dGhvcml6ZWQobG5nKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfS0VZLCBsbmcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsbmcgPSBub3JtYWxpemUobG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfS0VZKSk7XG4gICAgICAgIGlmIChpc0F1dGhvcml6ZWQobG5nKSkgcmV0dXJuIGxuZztcblxuICAgICAgICBsbmcgPSBub3JtYWxpemUobmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UpO1xuICAgICAgICBpZiAoaXNBdXRob3JpemVkKGxuZykpIHJldHVybiBsbmc7XG5cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZShjb25maWcuZGVmYXVsdExhbmd1YWdlIHx8IChjb25maWcubGFuZ3VhZ2VzICYmIGNvbmZpZy5sYW5ndWFnZXNbMF0pKTtcbiAgICB9XG5cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBsYW5ndWFnZTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcImRvbWFpblwiOlwibWVzc2FnZXNcIixcImxvY2FsZV9kYXRhXCI6e1wibWVzc2FnZXNcIjp7XCJcIjp7XCJkb21haW5cIjpcIm1lc3NhZ2VzXCIsXCJwbHVyYWxfZm9ybXNcIjpcIm5wbHVyYWxzPTI7IHBsdXJhbD0obiAhPSAxKTtcIixcImxhbmdcIjpcImVuXCJ9LFwiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtIGxlZnRcIjpbXCI8c3Ryb25nPiVkPC9zdHJvbmc+IGl0ZW1zIGxlZnRcIixcIlwiLFwiXCJdLFwiQWxsXCI6W251bGwsXCJcIl0sXCJBY3RpdmVcIjpbbnVsbCxcIlwiXSxcIkNvbXBsZXRlZFwiOltudWxsLFwiXCJdLFwiQ2xlYXIgY29tcGxldGVkXCI6W251bGwsXCJcIl0sXCJ0b2Rvc1wiOltudWxsLFwiXCJdLFwiV2hhdCBuZWVkcyB0byBiZSBkb25lP1wiOltudWxsLFwiXCJdLFwiRG91YmxlLWNsaWNrIHRvIGVkaXQgYSB0b2RvXCI6W251bGwsXCJcIl0sXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVwiOltudWxsLFwiXCJdfX19IiwibW9kdWxlLmV4cG9ydHM9e1wiZG9tYWluXCI6XCJtZXNzYWdlc1wiLFwibG9jYWxlX2RhdGFcIjp7XCJtZXNzYWdlc1wiOntcIlwiOntcImRvbWFpblwiOlwibWVzc2FnZXNcIixcInBsdXJhbF9mb3Jtc1wiOlwibnBsdXJhbHM9MjsgcGx1cmFsPShuID4gMSk7XCIsXCJsYW5nXCI6XCJmclwifSxcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbSBsZWZ0XCI6W1wiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtcyBsZWZ0XCIsXCI8c3Ryb25nPiVkPC9zdHJvbmc+IHTDomNoZSByZXN0YW50ZVwiLFwiPHN0cm9uZz4lZDwvc3Ryb25nPiB0w6JjaGVzIHJlc3RhbnRlc1wiXSxcIkFsbFwiOltudWxsLFwiVG91c1wiXSxcIkFjdGl2ZVwiOltudWxsLFwiRW4gY291cnNcIl0sXCJDb21wbGV0ZWRcIjpbbnVsbCxcIlRlcm1pbsOpc1wiXSxcIkNsZWFyIGNvbXBsZXRlZFwiOltudWxsLFwiRWZmYWNlciBsZXMgdGVybWluw6lzXCJdLFwidG9kb3NcIjpbbnVsbCxcInRvZG9zXCJdLFwiV2hhdCBuZWVkcyB0byBiZSBkb25lP1wiOltudWxsLFwiUXUnZXN0LWNlIHF1aSBlc3Qgw6AgZmFpcmUgP1wiXSxcIkRvdWJsZS1jbGljayB0byBlZGl0IGEgdG9kb1wiOltudWxsLFwiRG91YmxlIGNsaWMgcG91ciDDqWRpdGVyIHVuIHRvZG9cIl0sXCJNYXJrIGFsbCBhcyBjb21wbGV0ZVwiOltudWxsLFwiVG91dCBjbMO0dHVyZXJcIl19fX0iXX0=
