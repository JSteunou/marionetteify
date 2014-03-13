module.exports = function (grunt) {

    var vendors = 'jquery backbone backbone.marionette'.split(' ');

    grunt.initConfig({

        browserify: {
            options: {
                extensions: [ '.coffee', '.js' ],
                transform: ['coffeeify']
            },
            app: {
                src: 'src/kernel.js',
                dest: 'dist/bundle.js',
                options: {
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


    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['browserify:app']);
    grunt.registerTask('vendors', ['browserify:vendors']);

};
