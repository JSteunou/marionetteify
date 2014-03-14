module.exports = function (grunt) {

    var vendors = 'jquery backbone backbone.marionette'.split(' ');

    grunt.initConfig({

        browserify: {
            options: {
                extensions: ['.js', '.coffee'],
                transform: ['coffeeify', 'hbsfy']
            },
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
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
