// The filerev/usemin logic is adapted from the Yeoman Bootstrap/Webapp template
// Including ngrok/Pagespeed is from
// http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
var ngrok = require('ngrok');

module.exports = function(grunt) {
    'use strict';
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
      useminPrepare: 'grunt-usemin'
    });

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
                        '.tmp',
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
                    strategy: 'desktop'
                }
            },
            mobile: {
                options: {
                    strategy: 'mobile'
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: '<%= config.dist %>/img'
                }]
            }
        },

        inline: {
            dist: {
                options: {
                    cssmin: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                        dest: '<%= config.dist %>'
                }]
            }
        },

        // Note: This task will only run successfully when GraphicsMagick or ImageMagick is installed
        responsive_images: {
            dist: {
                options: {
                    sizes: [{
                        name: 'thumbnail',
                        width: 100
                    }]
                },
                files: {
                    '<%= config.dist %>/views/images/pizzeria.jpg': '<%= config.app %>/views/images/pizzeria.jpg'
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/js/{,*/}*.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/img/{,*/}*.*',
                    '<%= config.dist %>/views/images/pizzeria-thumbnail.jpg'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            // html: [ '<%= config.src %>/*.html' ]
            html: [ '*.html' ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img',
                    '<%= config.dist %>/views/images/pizzera-thumbnail.jpg',
                    '<%= config.dist %>/css'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css']
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '{,*/}*.html',
                        // Of course the files below views should be
                        // equally minimized. I simply haven't done so
                        // since it's not in the scope of the project.
                        'views/css/*',
                        'views/images/*',
                        'views/js/*'
                    ]
                },
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            },
        },


    });

    // Register customer task for ngrok
    // For details, see
    // http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8080;
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
        'clean:dist',
        'useminPrepare',
        'imagemin',
        'responsive_images',
        'concat', // generated by useminPrepare
        'cssmin', // generated by useminPrepare
        'uglify', // generated by useminPrepare
        'copy:dist',
        'inline',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', ['build']);
};
