module.exports = function (grunt) {

    var vendors = 'jquery backbone backbone.marionette backbone.localstorage'.split(' ');

    grunt.initConfig({

        browserify: {
            // just the app
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
                options: {
                    debug: true,
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    external: vendors
                }
            },
            // just vendors
            vendors: {
                files: {
                    'dist/vendors.js': []
                },
                options: {
                    'require': vendors
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



        watch: {
            options: {
                livereload: true,
                spawn: false,
                interrupt: true
            },
            src: {
                files: ['src/**/*'],
                tasks: ['browserify:app'],
            },
            index: {
                files: ['src/index.html'],
                tasks: ['targethtml:dev']
            },
            assets: {
                files: ['assets/**/*']
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
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('builddev', ['browserify:app', 'browserify:vendors', 'targethtml:dev']);
    grunt.registerTask('buildprod', ['browserify:bundle', 'uglify', 'targethtml:prod']);
    grunt.registerTask('run',   ['builddev', 'connect', 'watch']);

};
