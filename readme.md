A TodoMVC example with Marionette, Handlebars & Browserify production ready!
=================================================================

> This project aims to present *a* structured project ready for production using [Backbone](http://backbonejs.org/) / [Marionette](http://marionettejs.com/), [Handlebars](http://handlebarsjs.com/), [Jed](http://slexaxton.github.io/Jed/), [Browerify](http://browserify.org/), [Grunt](http://gruntjs.com/).

## Why?

Because I have been working with Marionette since v0.9 on little and big real word projects and setting an easy to use production tool chain to build and deploy was never easy. I worked with javascript object namespace, then AMD / RequireJS. Building with bash script, python script, then finally grunt.

ES6 / Harmony is coming with import / export feature and it is the feature some of us are waiting the most. But I need it today, while being able to build for legacy browsers also. (Yes I'm talking to you IE).

Here comes a new challenger: [Browserify](http://browserify.org/), which is a very nice actual abstraction to use CommonJS / NodeJS like import (require) / export that also play very fine with package manager. Putting this with the power of Grunt, npm and the JS community that write great tools and plugins, there is no excuse to not use a proper production ready tool chain today.


### Why TodoMVC?

Because [Addy Osmani & folks](https://github.com/tastejs/todomvc) did a great job with this application to help us discover and choose between a lot of framework and tools. Also it totally fits with the spirit of this example: this is *a* solution, they are so much other ways.

You can have a taste with the Backbone version, or the Marionette one, with or without RequireJS, generally with inline templating which are very fine for little project like this Todo application. But when your application goes big, like very big, you need more or you will fall back down in old vicious non maintainable structure.

By starting from this application you can see the differences and maybe have a better understand of all little concepts I tried to put on.


### Why Browserify?

Because I do not need the A of AMD -if you build a single file at the end you neither- and RequireJS needs of boilerplate code bothers me. Also:

* quite close of ES6 module syntax
* same NodeJS syntax
* [npm](https://www.npmjs.org/) power! (63 857 packages and growing)
* very simple but yet very powerful. External and require option are divine!
* great people that build great plugins. Once we taste the transform option to load Handlebars template, coffeescript, AMD, ... you can not go back!


## Features

* project files structure: very Marionette usage oriented
* architecture orientation & modularity thanks to Marionette App & Modules
* real time automatic watch / build / refresh in browser thanks to Grunt / watch / livereload / connect
* optimized development build: vendors and app separation
* clean & DRY import / export, module writing. No boilerplate needed, no more wrapper or IIFE everywhere!
* very simple use of Handlebars template thanks to hbsy!
* coffeescript compatible thanks to coffeeify!


## Step by step explanation

Very soon on my blog!

## Roadmap

* 0.2.0 i18n with [Jed](http://slexaxton.github.io/Jed/), pot / po generation, singular / plural support
* 0.3.0 less integration, better css dividing: each view its css, its module its assets


## One more thing

This is *a* solution, not *the* solution. It fits my need with the tools I like. You may have other needs, other targets, other tastes and disagree with my solution, that is fine!
[test]: https://github.com/tastejs/todomvc
