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



Handlebars.registerHelper("gtt", function(singular, plural, n) {
    if (plural) {
        return Jed.sprintf(jedi18n.ngettext(singular, plural, n), n);
    } else {
        return jedi18n(singular);
    }
});

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
  stack1 = (helper = helpers.gtt || (depth0 && depth0.gtt),options={hash:{},data:data},helper ? helper.call(depth0, "<strong>%d</strong> item left", "<strong>%d</strong> items left", (depth0 && depth0.activeCount), options) : helperMissing.call(depth0, "gtt", "<strong>%d</strong> item left", "<strong>%d</strong> items left", (depth0 && depth0.activeCount), options));
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
    + ")\n</button>";
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
    + "\" autofocus>\n</form>";
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
    + "</label>\n<ul id=\"todo-list\"></ul>";
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


function gettext() {
    jedi18n.gettext.apply(jedi18n, arguments);
}

gettext.gettext  = _.bind(jedi18n.gettext, jedi18n);
gettext.ngettext = _.bind(jedi18n.ngettext, jedi18n);



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


var language = {

    set: function(lng) {
        if (isAuthorized(lng)) {
            localStorage.setItem(LS_KEY, lng);
        }
    },

    get: function() {
        return localStorage.getItem(LS_KEY) || config.defaultLanguage || (config.languages && config.languages[0]) || 'en';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL2FwcC5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9jb25maWcuanNvbiIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9oZWxwZXJzL2dldHRleHQuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL2NvbnRyb2xsZXIuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL21vZGVscy90b2RvLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby9tb2RlbHMvdG9kb3MuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL21vZHVsZS5jb2ZmZWUiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3JvdXRlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2Zvb3Rlci9mb290ZXIuaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy9sYXlvdXQvZm9vdGVyL2Zvb3Rlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2hlYWRlci9oZWFkZXIuaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy9sYXlvdXQvaGVhZGVyL2hlYWRlci5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvbGF5b3V0L2xheW91dC5oYnMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3ZpZXdzL2xheW91dC9sYXlvdXQuanMiLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS9zcmMvbW9kdWxlcy90b2RvL3ZpZXdzL3RvZG9zL2NvbGxlY3Rpb24uaGJzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy90b2Rvcy9jb2xsZWN0aW9uLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL21vZHVsZXMvdG9kby92aWV3cy90b2Rvcy9pdGVtLmhicyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9tb2R1bGVzL3RvZG8vdmlld3MvdG9kb3MvaXRlbS5qcyIsIi9ob21lL2ctcm9tL0dpdC9tYXJpb25ldHRlaWZ5L3NyYy9zZXJ2aWNlcy9qZWRpMThuLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvc3JjL3NlcnZpY2VzL2xhbmd1YWdlLmpzIiwiL2hvbWUvZy1yb20vR2l0L21hcmlvbmV0dGVpZnkvdHJhbnNsYXRpb25zL2VuLmpzb24iLCIvaG9tZS9nLXJvbS9HaXQvbWFyaW9uZXR0ZWlmeS90cmFuc2xhdGlvbnMvZnIuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JDQTs7OztBQ0FBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBWZW5kb3JzXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xudmFyIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKTtcbkJhY2tib25lLiQgPSAkO1xudmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyk7XG5cblxuLy8gTG9jYWxcbnJlcXVpcmUoJy4vaGVscGVycy9nZXR0ZXh0Jyk7XG52YXIgVG9kb01vZHVsZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90b2RvL21vZHVsZScpO1xuXG5cblxuLy8gYXBwIGJvb3RzdHJhcFxudmFyIGFwcCA9IG5ldyBNYXJpb25ldHRlLkFwcGxpY2F0aW9uKCk7XG5hcHAubW9kdWxlKCd0b2RvJywgVG9kb01vZHVsZSk7XG5hcHAuc3RhcnQoKTtcbkJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gYXBwO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICAgIFwibGFuZ3VhZ2VzXCI6IFtcbiAgICAgICAgXCJlblwiLFxuICAgICAgICBcImZyXCJcbiAgICBdLFxuICAgIFwiZGVmYXVsdExhbmd1YWdlXCI6IFwiZnJcIlxufVxuIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiaGJzZnkvcnVudGltZVwiKTtcbnZhciBKZWQgPSByZXF1aXJlKCdqZWQnKTtcblxudmFyIGplZGkxOG4gPSByZXF1aXJlKFwiLi4vc2VydmljZXMvamVkaTE4blwiKTtcblxuXG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoXCJndHRcIiwgZnVuY3Rpb24oc2luZ3VsYXIsIHBsdXJhbCwgbikge1xuICAgIGlmIChwbHVyYWwpIHtcbiAgICAgICAgcmV0dXJuIEplZC5zcHJpbnRmKGplZGkxOG4ubmdldHRleHQoc2luZ3VsYXIsIHBsdXJhbCwgbiksIG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBqZWRpMThuKHNpbmd1bGFyKTtcbiAgICB9XG59KTtcbiIsInZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpO1xuXG52YXIgVG9kb0xheW91dCA9IHJlcXVpcmUoJy4vdmlld3MvbGF5b3V0L2xheW91dCcpO1xudmFyIFRvZG9zQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4vbW9kZWxzL3RvZG9zJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmlvbmV0dGUuQ29udHJvbGxlci5leHRlbmQoe1xuXG4gICAgb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudG9kb3NDb2xsZWN0aW9uID0gbmV3IFRvZG9zQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnRvZG9zTGF5b3V0ID0gbmV3IFRvZG9MYXlvdXQoe3RvZG9zQ29sbGVjdGlvbjogdGhpcy50b2Rvc0NvbGxlY3Rpb259KTtcblxuICAgICAgICB2YXIgb25TdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMudG9kb1JlZ2lvbi5zaG93KHRoaXMudG9kb3NMYXlvdXQpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudG9kb3NDb2xsZWN0aW9uLmZldGNoKHtzdWNjZXNzOiBvblN1Y2Nlc3N9KTtcbiAgICB9LFxuXG5cbiAgICBmaWx0ZXJJdGVtczogZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgICAgIGZpbHRlciA9IChmaWx0ZXIgJiYgZmlsdGVyLnRyaW0oKSB8fCAnYWxsJyk7XG4gICAgICAgIHRoaXMudG9kb3NMYXlvdXQudXBkYXRlRmlsdGVyKGZpbHRlcik7XG4gICAgfVxuXG59KTtcbiIsInZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIGNyZWF0ZWQ6IDBcbiAgICB9LFxuXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOZXcoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoJ2NyZWF0ZWQnLCBEYXRlLm5vdygpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KCdjb21wbGV0ZWQnLCAhdGhpcy5pc0NvbXBsZXRlZCgpKTtcbiAgICB9LFxuXG4gICAgaXNDb21wbGV0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdjb21wbGV0ZWQnKTtcbiAgICB9XG5cbn0pOyIsInZhciBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyk7XG5CYWNrYm9uZS5Mb2NhbFN0b3JhZ2UgPSByZXF1aXJlKFwiYmFja2JvbmUubG9jYWxzdG9yYWdlXCIpO1xuXG52YXIgVG9kb01vZGVsID0gcmVxdWlyZSgnLi90b2RvJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcblxuICAgIG1vZGVsOiBUb2RvTW9kZWwsXG5cbiAgICBsb2NhbFN0b3JhZ2U6IG5ldyBCYWNrYm9uZS5Mb2NhbFN0b3JhZ2UoJ3RvZG9zLWJhY2tib25lLW1hcmlvbmV0dGUtYnJvd3NlcmlmeScpLFxuXG5cblxuICAgIGdldENvbXBsZXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5faXNDb21wbGV0ZWQpO1xuICAgIH0sXG5cbiAgICBnZXRBY3RpdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVqZWN0KHRoaXMuX2lzQ29tcGxldGVkKTtcbiAgICB9LFxuXG4gICAgY29tcGFyYXRvcjogZnVuY3Rpb24gKHRvZG8pIHtcbiAgICAgICAgcmV0dXJuIHRvZG8uZ2V0KCdjcmVhdGVkJyk7XG4gICAgfSxcblxuXG5cbiAgICBfaXNDb21wbGV0ZWQ6IGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgICAgIHJldHVybiB0b2RvLmlzQ29tcGxldGVkKCk7XG4gICAgfVxuXG59KTsiLCJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuUm91dGVyID0gcmVxdWlyZSAnLi9yb3V0ZXInXG5Db250cm9sbGVyID0gcmVxdWlyZSAnLi9jb250cm9sbGVyJ1xuXG5cblxuY2xhc3MgVG9kb01vZHVsZSBleHRlbmRzIE1hcmlvbmV0dGUuTW9kdWxlXG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICB0aGlzLnRvZG9SZWdpb25JZCA9ICd0b2RvLW1vZHVsZS1yZWdpb24nXG5cblxuICAgIG9uU3RhcnQ6IC0+XG4gICAgICAgICMgZW5jYXBzdWxhdGUgZWFjaCBtb2R1bGUgaW4gYSBjb250YWluZXJcbiAgICAgICAgIyBzbyB5b3UgY2FuIGRvIHdoYXQgeW91IHdhbnQgd2l0aG91dFxuICAgICAgICAjIGFmZmVjdGluZyBvdGhlciBtb2R1bGVzXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNvbnRhaW5lcigpXG4gICAgICAgIHRoaXMuX2FkZFJlZ2lvbigpXG4gICAgICAgIHRoaXMuX3N0YXJ0TWVkaWF0b3IoKVxuXG4gICAgb25TdG9wOiAtPlxuICAgICAgICAjIHJlbW92ZSByZWdpb24gJiBjb250YWluZXIgd2hlbiBzdG9wcGluZ1xuICAgICAgICAjIHVubG9hZCBvZiBtb2R1bGUgY291bGQgYmUgaW1wb3J0YW50IGluIGJpZyBhcHAgLyBtb2R1bGVzXG4gICAgICAgIHRoaXMuX3N0b3BNZWRpYXRvcigpXG4gICAgICAgIHRoaXMuX3JlbW92ZVJlZ2lvbigpXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb250YWluZXIoKVxuXG5cblxuICAgIF9jcmVhdGVDb250YWluZXI6IC0+XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgIG5vZGUuaWQgPSB0aGlzLnRvZG9SZWdpb25JZFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIG5vZGVcblxuICAgIF9hZGRSZWdpb246IC0+XG4gICAgICAgIHRoaXMuYXBwLmFkZFJlZ2lvbnMgdG9kb1JlZ2lvbjogJyMnICsgdGhpcy50b2RvUmVnaW9uSWRcblxuICAgIF9zdGFydE1lZGlhdG9yOiAtPlxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlciB0b2RvUmVnaW9uOiB0aGlzLmFwcC50b2RvUmVnaW9uXG4gICAgICAgIHJvdXRlciA9IG5ldyBSb3V0ZXIgY29udHJvbGxlcjogdGhpcy5jb250cm9sbGVyXG5cblxuXG5cbiAgICBfZGVzdHJveUNvbnRhaW5lcjogLT5cbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIHRoaXMudG9kb1JlZ2lvbklkXG4gICAgICAgIG5vZGU/LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQgbm9kZVxuXG4gICAgX3JlbW92ZVJlZ2lvbjogLT5cbiAgICAgICAgdGhpcy5hcHAucmVtb3ZlUmVnaW9uICd0b2RvUmVnaW9uJ1xuXG4gICAgX3N0b3BNZWRpYXRvcjogLT5cbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnN0b3AoKVxuXG5cblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBUb2RvTW9kdWxlXG5cbiIsInZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkFwcFJvdXRlci5leHRlbmQoe1xuXG4gICAgLy8gZXh0ZW5kIEFwcFJvdXRlciB0byB0ZWxsIHRoZSBjb250cm9sbGVyXG4gICAgLy8gd2hlbiB0aGUgcm91dGVyIGlzIG9rXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgTWFyaW9uZXR0ZS5BcHBSb3V0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2dldENvbnRyb2xsZXIoKS50cmlnZ2VyTWV0aG9kKCdzdGFydCcpO1xuICAgIH0sXG5cblxuICAgIGFwcFJvdXRlczoge1xuICAgICAgICAnKmZpbHRlcic6ICdmaWx0ZXJJdGVtcydcbiAgICB9XG5cbn0pOyIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gXCJcIiwgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgXG4gIHJldHVybiBcImNsYXNzPVxcXCJoaWRkZW5cXFwiXCI7XG4gIH1cblxuICBidWZmZXIgKz0gXCI8c3BhbiBpZD1cXFwidG9kby1jb3VudFxcXCI+XFxuICAgIFwiO1xuICBzdGFjazEgPSAoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbSBsZWZ0XCIsIFwiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtcyBsZWZ0XCIsIChkZXB0aDAgJiYgZGVwdGgwLmFjdGl2ZUNvdW50KSwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbSBsZWZ0XCIsIFwiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtcyBsZWZ0XCIsIChkZXB0aDAgJiYgZGVwdGgwLmFjdGl2ZUNvdW50KSwgb3B0aW9ucykpO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgYnVmZmVyICs9IFwiXFxuPC9zcGFuPlxcbjx1bCBpZD1cXFwiZmlsdGVyc1xcXCI+XFxuICAgIDxsaT5cXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiQWxsXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJBbGxcIiwgb3B0aW9ucykpKVxuICAgICsgXCI8L2E+XFxuICAgIDwvbGk+XFxuICAgIDxsaT5cXG4gICAgICAgIDxhIGhyZWY9XFxcIiNhY3RpdmVcXFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiQWN0aXZlXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJBY3RpdmVcIiwgb3B0aW9ucykpKVxuICAgICsgXCI8L2E+XFxuICAgIDwvbGk+XFxuICAgIDxsaT5cXG4gICAgICAgIDxhIGhyZWY9XFxcIiNjb21wbGV0ZWRcXFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiQ29tcGxldGVkXCIsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJndHRcIiwgXCJDb21wbGV0ZWRcIiwgb3B0aW9ucykpKVxuICAgICsgXCI8L2E+XFxuICAgIDwvbGk+XFxuPC91bD5cXG48YnV0dG9uIGlkPVxcXCJjbGVhci1jb21wbGV0ZWRcXFwiIFwiO1xuICBzdGFjazEgPSBoZWxwZXJzLnVubGVzcy5jYWxsKGRlcHRoMCwgKGRlcHRoMCAmJiBkZXB0aDAuY29tcGxldGVkQ291bnQpLCB7aGFzaDp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgYnVmZmVyICs9IFwiPlxcbiAgICBcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5ndHQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuZ3R0KSxvcHRpb25zPXtoYXNoOnt9LGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBcIkNsZWFyIGNvbXBsZXRlZFwiLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZ3R0XCIsIFwiQ2xlYXIgY29tcGxldGVkXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiIChcIjtcbiAgaWYgKGhlbHBlciA9IGhlbHBlcnMuY29tcGxldGVkQ291bnQpIHsgc3RhY2sxID0gaGVscGVyLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KTsgfVxuICBlbHNlIHsgaGVscGVyID0gKGRlcHRoMCAmJiBkZXB0aDAuY29tcGxldGVkQ291bnQpOyBzdGFjazEgPSB0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pIDogaGVscGVyOyB9XG4gIGJ1ZmZlciArPSBlc2NhcGVFeHByZXNzaW9uKHN0YWNrMSlcbiAgICArIFwiKVxcbjwvYnV0dG9uPlwiO1xuICByZXR1cm4gYnVmZmVyO1xuICB9KTtcbiIsInZhciBNYXJpb25ldHRlID0gcmVxdWlyZSgnYmFja2JvbmUubWFyaW9uZXR0ZScpO1xuXG52YXIgdHBsID0gcmVxdWlyZSgnLi9mb290ZXIuaGJzJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogdHBsLFxuXG4gICAgdWk6IHtcbiAgICAgICAgZmlsdGVyczogJyNmaWx0ZXJzIGEnXG4gICAgfSxcblxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgI2NsZWFyLWNvbXBsZXRlZCc6ICdvbkNsZWFyQ2xpY2snXG4gICAgfSxcblxuICAgIGNvbGxlY3Rpb25FdmVudHM6IHtcbiAgICAgICAgJ2FsbCc6ICdyZW5kZXInXG4gICAgfSxcblxuICAgIC8vIHRlbXBsYXRlSGVscGVyczoge1xuICAgIC8vICAgICBhY3RpdmVDb3VudExhYmVsOiAodGhpcy5hY3RpdmVDb3VudCA9PT0gMSA/ICdpdGVtJyA6ICdpdGVtcycpICsgJyBsZWZ0J1xuICAgIC8vIH0sXG5cbiAgICBzZXJpYWxpemVEYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmNvbGxlY3Rpb24uZ2V0QWN0aXZlKCkubGVuZ3RoO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmVDb3VudDogYWN0aXZlLFxuICAgICAgICAgICAgdG90YWxDb3VudDogdG90YWwsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudDogdG90YWwgLSBhY3RpdmVcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIG9uUmVuZGVyIG9ubHkgZm9yIHVwZGF0ZSBhZnRlclxuICAgIC8vIGZpcnN0IHJlbmRlciAvIHNob3dcbiAgICBvblJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSxcblxuICAgIC8vIHVzZSBvblNob3cgcmF0aGVyIHRoYW4gb25SZW5kZXIgYmVjYXVzZSBET00gaXMgbm90IHJlYWR5XG4gICAgLy8gYW5kIHRoaXMuJGVsIGZpbmQgb3IgcGFyZW50IHdpbGwgcmV0dXJuIG5vdGhpbmdcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9LFxuXG4gICAgb25DbGVhckNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSB0aGlzLmNvbGxlY3Rpb24uZ2V0Q29tcGxldGVkKCk7XG4gICAgICAgIGNvbXBsZXRlZC5mb3JFYWNoKGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgICAgICAgICB0b2RvLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGVsLnBhcmVudCgpLnRvZ2dsZSh0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoID4gMCk7XG4gICAgfVxuXG59KTsiLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFycy50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIGhlbHBlciwgb3B0aW9ucywgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuXG5cbiAgYnVmZmVyICs9IFwiPGgxPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwidG9kb3NcIiwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcInRvZG9zXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiPC9oMT5cXG48Zm9ybT5cXG4gICAgPGlucHV0IGlkPVxcXCJuZXctdG9kb1xcXCIgcGxhY2Vob2xkZXI9XFxcIlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiV2hhdCBuZWVkcyB0byBiZSBkb25lP1wiLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZ3R0XCIsIFwiV2hhdCBuZWVkcyB0byBiZSBkb25lP1wiLCBvcHRpb25zKSkpXG4gICAgKyBcIlxcXCIgYXV0b2ZvY3VzPlxcbjwvZm9ybT5cIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfSk7XG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxudmFyIHRwbCA9IHJlcXVpcmUoJy4vaGVhZGVyLmhicycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG5cbiAgICB0ZW1wbGF0ZTogdHBsLFxuXG4gICAgdWk6IHtcbiAgICAgICAgaW5wdXQ6ICcjbmV3LXRvZG8nXG4gICAgfSxcblxuICAgIGV2ZW50czoge1xuICAgICAgICAnc3VibWl0IGZvcm0nOiAnb25TdWJtaXQnXG4gICAgfSxcblxuXG5cbiAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gcHJldmVudCBmb3JtIG9yaWduYWwgc3VibWl0XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgdG9kb1RleHQgPSB0aGlzLnVpLmlucHV0LnZhbCgpLnRyaW0oKTtcbiAgICAgICAgaWYgKHRvZG9UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdG9kb1RleHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy51aS5pbnB1dC52YWwoJycpO1xuICAgICAgICB9XG4gICAgfVxuXG59KTsiLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFycy50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIGhlbHBlciwgb3B0aW9ucywgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuXG5cbiAgYnVmZmVyICs9IFwiPHNlY3Rpb24gaWQ9XFxcInRvZG9hcHBcXFwiPlxcbiAgICA8aGVhZGVyIGlkPVxcXCJoZWFkZXJcXFwiPjwvaGVhZGVyPlxcbiAgICA8c2VjdGlvbiBpZD1cXFwibWFpblxcXCI+PC9zZWN0aW9uPlxcbiAgICA8Zm9vdGVyIGlkPVxcXCJmb290ZXJcXFwiPjwvZm9vdGVyPlxcbjwvc2VjdGlvbj5cXG48Zm9vdGVyIGlkPVxcXCJpbmZvXFxcIj5cXG4gICAgPHA+XCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnMuZ3R0IHx8IChkZXB0aDAgJiYgZGVwdGgwLmd0dCksb3B0aW9ucz17aGFzaDp7fSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgXCJEb3VibGUtY2xpY2sgdG8gZWRpdCBhIHRvZG9cIiwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcIkRvdWJsZS1jbGljayB0byBlZGl0IGEgdG9kb1wiLCBvcHRpb25zKSkpXG4gICAgKyBcIjwvcD5cXG4gICAgPHA+V3JpdHRlbiBieSA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vSlN0ZXVub3VcXFwiPkrDqXLDtG1lIFN0ZXVub3U8L2E+XFxuICAgICAgICBiYXNlZCBvbiA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vYWRkeW9zbWFuaVxcXCI+QWRkeSBPc21hbmkgVG9kb01WQyBwcm9qZWN0PC9hPjxicj5cXG4gICAgICAgIGFuZCB0aGUgPGEgaHJlZj1cXFwiaHR0cDovL3RvZG9tdmMuY29tL2xhYnMvYXJjaGl0ZWN0dXJlLWV4YW1wbGVzL2JhY2tib25lX21hcmlvbmV0dGUvXFxcIj5NYXJpb25ldHRlIFRvZG9NVkM8L2E+XFxuICAgICAgICBjcmVhdGVkIGJ5IDxhIGhyZWY9XFxcImh0dHA6Ly9naXRodWIuY29tL2pzb3ZlcnNvblxcXCI+SmFycm9kIE92ZXJzb248L2E+XFxuICAgICAgICBhbmQgPGEgaHJlZj1cXFwiaHR0cDovL2dpdGh1Yi5jb20vZGVyaWNrYmFpbGV5XFxcIj5EZXJpY2sgQmFpbGV5PC9hPlxcbiAgICA8L3A+XFxuPC9mb290ZXI+XFxuXCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH0pO1xuIiwidmFyIE1hcmlvbmV0dGUgPSByZXF1aXJlKCdiYWNrYm9uZS5tYXJpb25ldHRlJyk7XG5cblxudmFyIEhlYWRlclZpZXcgPSByZXF1aXJlKCcuL2hlYWRlci9oZWFkZXInKTtcbnZhciBUb2Rvc1ZpZXcgPSByZXF1aXJlKCcuLi90b2Rvcy9jb2xsZWN0aW9uJyk7XG52YXIgRm9vdGVyVmlldyA9IHJlcXVpcmUoJy4vZm9vdGVyL2Zvb3RlcicpO1xudmFyIHRwbCA9IHJlcXVpcmUoJy4vbGF5b3V0LmhicycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkxheW91dC5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiB0cGwsXG5cbiAgICB1aToge1xuICAgICAgICBhcHA6ICcjdG9kb2FwcCdcbiAgICB9LFxuXG4gICAgcmVnaW9uczoge1xuICAgICAgICBoZWFkZXI6ICAgICAnI2hlYWRlcicsXG4gICAgICAgIG1haW46ICAgICAgICcjbWFpbicsXG4gICAgICAgIGZvb3RlcjogICAgICcjZm9vdGVyJ1xuICAgIH0sXG5cblxuXG4gICAgdXBkYXRlRmlsdGVyOiBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICAgICAgdGhpcy51aS5hcHAuYXR0cignY2xhc3MnLCAnZmlsdGVyLScgKyBmaWx0ZXIpO1xuICAgIH0sXG5cblxuXG4gICAgb25TaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7Y29sbGVjdGlvbjogdGhpcy5vcHRpb25zLnRvZG9zQ29sbGVjdGlvbn07XG5cbiAgICAgICAgdGhpcy5oZWFkZXIuc2hvdyhuZXcgSGVhZGVyVmlldyhvcHRpb25zKSk7XG4gICAgICAgIHRoaXMubWFpbi5zaG93KG5ldyBUb2Rvc1ZpZXcob3B0aW9ucykpO1xuICAgICAgICB0aGlzLmZvb3Rlci5zaG93KG5ldyBGb290ZXJWaWV3KG9wdGlvbnMpKTtcbiAgICB9XG5cbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnMudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSBcIlwiLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcblxuXG4gIGJ1ZmZlciArPSBcIjxpbnB1dCBpZD1cXFwidG9nZ2xlLWFsbFxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiPlxcbjxsYWJlbCBmb3I9XFxcInRvZ2dsZS1hbGxcXFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmd0dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5ndHQpLG9wdGlvbnM9e2hhc2g6e30sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIFwiTWFyayBhbGwgYXMgY29tcGxldGVcIiwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImd0dFwiLCBcIk1hcmsgYWxsIGFzIGNvbXBsZXRlXCIsIG9wdGlvbnMpKSlcbiAgICArIFwiPC9sYWJlbD5cXG48dWwgaWQ9XFxcInRvZG8tbGlzdFxcXCI+PC91bD5cIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfSk7XG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxudmFyIFRvZG9JdGVtVmlldyA9IHJlcXVpcmUoJy4vaXRlbScpO1xudmFyIHRwbCA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbi5oYnMnKTtcblxuXG5cbi8vIEl0ZW0gTGlzdCBWaWV3XG4vLyAtLS0tLS0tLS0tLS0tLVxuLy9cbi8vIENvbnRyb2xzIHRoZSByZW5kZXJpbmcgb2YgdGhlIGxpc3Qgb2YgaXRlbXMsIGluY2x1ZGluZyB0aGVcbi8vIGZpbHRlcmluZyBvZiBhY3RpdnMgdnMgY29tcGxldGVkIGl0ZW1zIGZvciBkaXNwbGF5LlxubW9kdWxlLmV4cG9ydHMgPSBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogdHBsLFxuICAgIGl0ZW1WaWV3OiBUb2RvSXRlbVZpZXcsXG4gICAgaXRlbVZpZXdDb250YWluZXI6ICcjdG9kby1saXN0JyxcblxuICAgIHVpOiB7XG4gICAgICAgIHRvZ2dsZTogJyN0b2dnbGUtYWxsJ1xuICAgIH0sXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIEB1aS50b2dnbGUnOiAnb25Ub2dnbGVBbGxDbGljaydcbiAgICB9LFxuXG4gICAgY29sbGVjdGlvbkV2ZW50czoge1xuICAgICAgICAnYWxsJzogJ3VwZGF0ZSdcbiAgICB9LFxuXG5cbiAgICAvLyB1c2Ugb25TaG93IHJhdGhlciB0aGFuIG9uUmVuZGVyIGJlY2F1c2UgRE9NIGlzIG5vdCByZWFkeVxuICAgIC8vIGFuZCB0aGlzLiRlbCBmaW5kIG9yIHBhcmVudCB3aWxsIHJldHVybiBub3RoaW5nXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiByZWR1Y2VDb21wbGV0ZWQobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0ICYmIHJpZ2h0LmdldCgnY29tcGxldGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQ29tcGxldGVkID0gdGhpcy5jb2xsZWN0aW9uLnJlZHVjZShyZWR1Y2VDb21wbGV0ZWQsIHRydWUpO1xuXG4gICAgICAgIHRoaXMudWkudG9nZ2xlLnByb3AoJ2NoZWNrZWQnLCBhbGxDb21wbGV0ZWQpO1xuICAgICAgICB0aGlzLiRlbC5wYXJlbnQoKS50b2dnbGUoISF0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoKTtcbiAgICB9LFxuXG4gICAgb25Ub2dnbGVBbGxDbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5lYWNoKGZ1bmN0aW9uICh0b2RvKSB7XG4gICAgICAgICAgICB0b2RvLnNhdmUoeyAnY29tcGxldGVkJzogaXNDaGVja2VkIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnMudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSBcIlwiLCBzdGFjazEsIGhlbHBlciwgc2VsZj10aGlzLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIFxuICByZXR1cm4gXCJjaGVja2VkXCI7XG4gIH1cblxuICBidWZmZXIgKz0gXCI8ZGl2IGNsYXNzPVxcXCJ2aWV3XFxcIj5cXG4gICAgPGlucHV0IGNsYXNzPVxcXCJ0b2dnbGVcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIiBcIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAmJiBkZXB0aDAuY29tcGxldGVkKSwge2hhc2g6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIj5cXG4gICAgPGxhYmVsPlwiO1xuICBpZiAoaGVscGVyID0gaGVscGVycy50aXRsZSkgeyBzdGFjazEgPSBoZWxwZXIuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pOyB9XG4gIGVsc2UgeyBoZWxwZXIgPSAoZGVwdGgwICYmIGRlcHRoMC50aXRsZSk7IHN0YWNrMSA9IHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge2hhc2g6e30sZGF0YTpkYXRhfSkgOiBoZWxwZXI7IH1cbiAgYnVmZmVyICs9IGVzY2FwZUV4cHJlc3Npb24oc3RhY2sxKVxuICAgICsgXCI8L2xhYmVsPlxcbiAgICA8YnV0dG9uIGNsYXNzPVxcXCJkZXN0cm95XFxcIj48L2J1dHRvbj5cXG48L2Rpdj5cXG48aW5wdXQgY2xhc3M9XFxcImVkaXRcXFwiIHZhbHVlPVxcXCJcIjtcbiAgaWYgKGhlbHBlciA9IGhlbHBlcnMudGl0bGUpIHsgc3RhY2sxID0gaGVscGVyLmNhbGwoZGVwdGgwLCB7aGFzaDp7fSxkYXRhOmRhdGF9KTsgfVxuICBlbHNlIHsgaGVscGVyID0gKGRlcHRoMCAmJiBkZXB0aDAudGl0bGUpOyBzdGFjazEgPSB0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtoYXNoOnt9LGRhdGE6ZGF0YX0pIDogaGVscGVyOyB9XG4gIGJ1ZmZlciArPSBlc2NhcGVFeHByZXNzaW9uKHN0YWNrMSlcbiAgICArIFwiXFxcIj5cIjtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfSk7XG4iLCJ2YXIgTWFyaW9uZXR0ZSA9IHJlcXVpcmUoJ2JhY2tib25lLm1hcmlvbmV0dGUnKTtcblxudmFyIHRwbCA9IHJlcXVpcmUoJy4vaXRlbS5oYnMnKTtcblxuXG5cbi8vIFRvZG8gTGlzdCBJdGVtIFZpZXdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vXG4vLyBEaXNwbGF5IGFuIGluZGl2aWR1YWwgdG9kbyBpdGVtLCBhbmQgcmVzcG9uZCB0byBjaGFuZ2VzXG4vLyB0aGF0IGFyZSBtYWRlIHRvIHRoZSBpdGVtLCBpbmNsdWRpbmcgbWFya2luZyBjb21wbGV0ZWQuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgICB0YWdOYW1lOiAnbGknLFxuICAgIHRlbXBsYXRlOiB0cGwsXG5cbiAgICB1aToge1xuICAgICAgICBlZGl0OiAnLmVkaXQnXG4gICAgfSxcblxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgLmRlc3Ryb3knOiAgICAgICAnZGVzdHJveScsXG4gICAgICAgICdjbGljayAudG9nZ2xlJzogICAgICAgICd0b2dnbGUnLFxuICAgICAgICAnZGJsY2xpY2sgbGFiZWwnOiAgICAgICAnb25FZGl0Q2xpY2snLFxuICAgICAgICAna2V5ZG93biAgQHVpLmVkaXQnOiAgICAnb25FZGl0S2V5cHJlc3MnLFxuICAgICAgICAnZm9jdXNvdXQgQHVpLmVkaXQnOiAgICAnb25FZGl0Rm9jdXNvdXQnXG4gICAgfSxcblxuICAgIG1vZGVsRXZlbnRzOiB7XG4gICAgICAgICdjaGFuZ2UnOiAncmVuZGVyJ1xuICAgIH0sXG5cbiAgICBvblJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnYWN0aXZlIGNvbXBsZXRlZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmdldCgnY29tcGxldGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubW9kZWwuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC50b2dnbGUoKS5zYXZlKCk7XG4gICAgfSxcblxuICAgIG9uRWRpdENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdlZGl0aW5nJyk7XG4gICAgICAgIHRoaXMudWkuZWRpdC5mb2N1cygpO1xuICAgICAgICB0aGlzLnVpLmVkaXQudmFsKHRoaXMudWkuZWRpdC52YWwoKSk7XG4gICAgfSxcblxuICAgIG9uRWRpdEZvY3Vzb3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b2RvVGV4dCA9IHRoaXMudWkuZWRpdC52YWwoKS50cmltKCk7XG4gICAgICAgIGlmICh0b2RvVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXQoJ3RpdGxlJywgdG9kb1RleHQpLnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdlZGl0aW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVkaXRLZXlwcmVzczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIEVOVEVSX0tFWSA9IDEzLCBFU0NfS0VZID0gMjc7XG5cbiAgICAgICAgaWYgKGUud2hpY2ggPT09IEVOVEVSX0tFWSkge1xuICAgICAgICAgICAgdGhpcy5vbkVkaXRGb2N1c291dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUud2hpY2ggPT09IEVTQ19LRVkpIHtcbiAgICAgICAgICAgIHRoaXMudWkuZWRpdC52YWwodGhpcy5tb2RlbC5nZXQoJ3RpdGxlJykpO1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2VkaXRpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4iLCJ2YXIgSmVkID0gcmVxdWlyZSgnamVkJyk7XG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxuXG52YXIgbGFuZ3VhZ2VTZXJ2aWNlID0gcmVxdWlyZSgnLi9sYW5ndWFnZScpO1xuXG5cblxudmFyIHBvanNvbiA9IHJlcXVpcmUoJy4vdHJhbnNsYXRpb25zLycgKyBsYW5ndWFnZVNlcnZpY2UuZ2V0KCkpO1xudmFyIGplZGkxOG4gPSBuZXcgSmVkKHBvanNvbik7XG5cblxuZnVuY3Rpb24gZ2V0dGV4dCgpIHtcbiAgICBqZWRpMThuLmdldHRleHQuYXBwbHkoamVkaTE4biwgYXJndW1lbnRzKTtcbn1cblxuZ2V0dGV4dC5nZXR0ZXh0ICA9IF8uYmluZChqZWRpMThuLmdldHRleHQsIGplZGkxOG4pO1xuZ2V0dGV4dC5uZ2V0dGV4dCA9IF8uYmluZChqZWRpMThuLm5nZXR0ZXh0LCBqZWRpMThuKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0dGV4dDtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuXG5cbnZhciBMU19LRVkgPSAnbWFyaW9uZXR0ZWlmeS1sbmcnO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBsYW5ndWFnZSBjb2RlIGlzIGluIHRoZSBsaXN0XG4gKiBvZiBjb25maWd1cmF0aW9uIGxhbmd1YWdlcyBsaXN0XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBsbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0F1dGhvcml6ZWQgPSBmdW5jdGlvbihsbmcpIHtcbiAgICAvLyBubyBBcnJheS5pbmRleE9mIG9uIElFOFxuICAgIHJldHVybiBfLmluZGV4T2YoY29uZmlnLmxhbmd1YWdlcywgbG5nKSA+IC0xO1xufTtcblxuXG52YXIgbGFuZ3VhZ2UgPSB7XG5cbiAgICBzZXQ6IGZ1bmN0aW9uKGxuZykge1xuICAgICAgICBpZiAoaXNBdXRob3JpemVkKGxuZykpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX0tFWSwgbG5nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfS0VZKSB8fCBjb25maWcuZGVmYXVsdExhbmd1YWdlIHx8IChjb25maWcubGFuZ3VhZ2VzICYmIGNvbmZpZy5sYW5ndWFnZXNbMF0pIHx8ICdlbic7XG4gICAgfVxuXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gbGFuZ3VhZ2U7XG4iLCJtb2R1bGUuZXhwb3J0cz17XCJkb21haW5cIjpcIm1lc3NhZ2VzXCIsXCJsb2NhbGVfZGF0YVwiOntcIm1lc3NhZ2VzXCI6e1wiXCI6e1wiZG9tYWluXCI6XCJtZXNzYWdlc1wiLFwicGx1cmFsX2Zvcm1zXCI6XCJucGx1cmFscz0yOyBwbHVyYWw9KG4gIT0gMSk7XCIsXCJsYW5nXCI6XCJlblwifSxcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbSBsZWZ0XCI6W1wiPHN0cm9uZz4lZDwvc3Ryb25nPiBpdGVtcyBsZWZ0XCIsXCJcIixcIlwiXSxcIkFsbFwiOltudWxsLFwiXCJdLFwiQWN0aXZlXCI6W251bGwsXCJcIl0sXCJDb21wbGV0ZWRcIjpbbnVsbCxcIlwiXSxcIkNsZWFyIGNvbXBsZXRlZFwiOltudWxsLFwiXCJdLFwidG9kb3NcIjpbbnVsbCxcIlwiXSxcIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIjpbbnVsbCxcIlwiXSxcIkRvdWJsZS1jbGljayB0byBlZGl0IGEgdG9kb1wiOltudWxsLFwiXCJdLFwiTWFyayBhbGwgYXMgY29tcGxldGVcIjpbbnVsbCxcIlwiXX19fSIsIm1vZHVsZS5leHBvcnRzPXtcImRvbWFpblwiOlwibWVzc2FnZXNcIixcImxvY2FsZV9kYXRhXCI6e1wibWVzc2FnZXNcIjp7XCJcIjp7XCJkb21haW5cIjpcIm1lc3NhZ2VzXCIsXCJwbHVyYWxfZm9ybXNcIjpcIm5wbHVyYWxzPTI7IHBsdXJhbD0obiA+IDEpO1wiLFwibGFuZ1wiOlwiZnJcIn0sXCI8c3Ryb25nPiVkPC9zdHJvbmc+IGl0ZW0gbGVmdFwiOltcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gaXRlbXMgbGVmdFwiLFwiPHN0cm9uZz4lZDwvc3Ryb25nPiB0w6JjaGUgcmVzdGFudGVcIixcIjxzdHJvbmc+JWQ8L3N0cm9uZz4gdMOiY2hlcyByZXN0YW50ZXNcIl0sXCJBbGxcIjpbbnVsbCxcIlRvdXNcIl0sXCJBY3RpdmVcIjpbbnVsbCxcIkVuIGNvdXJzXCJdLFwiQ29tcGxldGVkXCI6W251bGwsXCJUZXJtaW7DqXNcIl0sXCJDbGVhciBjb21wbGV0ZWRcIjpbbnVsbCxcIkVmZmFjZXIgbGVzIHRlcm1pbsOpc1wiXSxcInRvZG9zXCI6W251bGwsXCJ0b2Rvc1wiXSxcIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIjpbbnVsbCxcIlF1J2VzdC1jZSBxdWkgZXN0IMOgIGZhaXJlID9cIl0sXCJEb3VibGUtY2xpY2sgdG8gZWRpdCBhIHRvZG9cIjpbbnVsbCxcIkRvdWJsZSBjbGljIHBvdXIgw6lkaXRlciB1biB0b2RvXCJdLFwiTWFyayBhbGwgYXMgY29tcGxldGVcIjpbbnVsbCxcIlRvdXQgY2zDtHR1cmVyXCJdfX19Il19
