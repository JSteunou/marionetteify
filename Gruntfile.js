module.exports = function (grunt) {

    var config = require('./src/config.json');
    var vendors = 'jquery backbone backbone.marionette backbone.localstorage'.split(' ');

    grunt.initConfig({

        /////////////////
        // build tasks //
        /////////////////

        browserify: {
            // just the app
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
                options: {
                    debug: true,
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    external: vendors,
                    require: config.languages.map(function(lng) { return './translations/' + lng; })
                }
            },
            // just vendors
            vendors: {
                files: {
                    'dist/vendors.js': []
                },
                options: {
                    require: vendors
                }
            },
            // bundle all in one
            bundle: {
                src: 'src/app.js',
                dest: 'dist/bundle.js',
                options: {
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy']
                }
            }
        },

        // produce index.html by target
        targethtml: {
            dev: {
                src: 'src/index.html',
                dest: 'index.html'
            },
            prod: {
                src: 'src/index.html',
                dest: 'index.html'
            }
        },

        uglify: {
            bundle: {
                src: 'dist/bundle.js',
                dest: 'dist/bundle.js'
            }
        },


        ////////////////
        // i18n tasks //
        ////////////////

        xgettext: {
            target: {
                files: {
                    handlebars: ["src/**/*.hbs"],
                    javascript: ["src/**/*.js"]
                },
                options: {
                    functionName: "gtt",
                    potFile: "translations/messages.pot"
                }
            }
        },

        po2json: {
            target: {
                src: ["translations/*.po"],
                dest: "translations/",
                options: {
                    pretty: true,
                    format: 'jed'
                }
            }
        },

        shell: {
            options: {
                failOnError: true
            },
            msgmerge: {
                command: config.languages.map(function(lng) {
                    var po = "translations/" + lng + ".po";
                    return "if [ -f \"" + po + "\" ]; then\n" +
                           "    echo \"Updating " + po + "\"\n" +
                           "    msgmerge " + po + " translations/messages.pot > .new.po.tmp\n" +
                           "    exitCode=$?\n" +
                           "    if [ $exitCode -ne 0 ]; then\n" +
                           "        echo \"Msgmerge failed with exit code $?\"\n" +
                           "        exit $exitCode\n" +
                           "    fi\n" +
                           "    mv .new.po.tmp " + po + "\n" +
                           "fi\n";
                }).join("")
            }
        },


        ////////////////////////////
        // run & livereload tasks //
        ////////////////////////////

        watch: {
            options: {
                livereload: true,
                spawn: false,
                interrupt: true
            },
            src: {
                files: ['src/**/*', '!src/index.html'],
                tasks: ['browserify:app'],
            },
            index: {
                files: ['src/index.html'],
                tasks: ['targethtml:dev']
            },
            others: {
                files: ['assets/**/*', 'translations/*.json']
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    open: true,
                    useAvailablePort: true,
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-po2json');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-xgettext');

    grunt.registerTask('builddev', ['browserify:app', 'browserify:vendors', 'targethtml:dev']);
    grunt.registerTask('buildprod', ['browserify:bundle', 'uglify', 'targethtml:prod']);
    grunt.registerTask('run',   ['builddev', 'connect', 'watch']);
    grunt.registerTask('updatepos', ['xgettext', 'shell']);

};
