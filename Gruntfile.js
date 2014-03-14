module.exports = function (grunt) {

    var vendors = 'jquery backbone backbone.marionette'.split(' ');

    grunt.initConfig({

        browserify: {
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
                options: {
                    extensions: ['.js', '.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    external: vendors
                }
            },
            vendors: {
                files: {
                    'dist/vendors.js': []
                },
                options: {
                    'require': vendors
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            src: {
                files: ['src/**/*', 'index.html'],
                tasks: ['browserify:app'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    open: true,
                    useAvailablePort: true
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['browserify']);
    grunt.registerTask('run',   ['connect', 'watch:src']);

};
