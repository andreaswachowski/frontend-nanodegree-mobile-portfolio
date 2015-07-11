var ngrok = require('ngrok');

module.exports = function(grunt) {
    'use strict';
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);

    var config = {
        app: '.',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,

        watch: {
            configFiles: {
                files: [ 'Gruntfile.js' ],
                options: {
                    reload: true
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*'
                    ]
                }
                ]
            }
        },

        eslint: {
            target: [ 'Gruntfile.js' ]
        },

        pagespeed: {
            options: {
                nokey: true,
                locale: 'en_GB',
                threshold: 90
            },
            desktop: {
                options: {
                    strategy: 'desktop',
                    paths: [ '/~andreas/perf/index.html' ]
                }
            },
            mobile: {
                options: {
                    strategy: 'mobile',
                    paths: [ '/~andreas/perf/index.html' ]
                }
            }
        }
    });

    // Register customer task for ngrok
    // For details, see
    // http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8000;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    // grunt.registerTask('lint', [ 'htmllint', 'jshint' ]);

    grunt.registerTask('test', [ 'psi-ngrok' ]);

    grunt.registerTask('build', [
        'clean:dist'
    ]);

    grunt.registerTask('default', ['build']);
};
