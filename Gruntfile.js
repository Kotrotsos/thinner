module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-contrib-clean');


    var tasks = ['svg_sprite', 'sass', 'concat', 'babel'];
    var dev = ['clean', 'svg_sprite', 'sasslint', 'sass', 'concat', 'babel', 'copy', 'connect', 'watch'];

    grunt.initConfig({

        /*
         * SASSLINT:
         * Checks the Sass files for style and coding errors
        */
        sasslint: {
            options: {
                configFile: '.sass-lint.yml',
            },
            target: ['src/styleguide/**/*.scss']
        },

        /*
         * Connect:
         * Runs the dev server on 8008.
        */
        connect: {
            dev: {
                options: {
                    port: 8008,
                    hostname: 'localhost',
                    base: '',
                    open: {
                        target: 'http://<%= connect.dev.options.hostname %>:' +
                            '<%= connect.dev.options.port %>'
                    }
                }
            },
        },

        /*
         * SASS:
         * Compile SASS files to CSS
        */
        sass: {
            options: {
                style: 'compact',
                lineNumbers: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'src/styleguide/base.scss'
                }
            }
        },

        /*
         * SVG_Sprite:
         * Creates a single svg sprite file from the images folder (just the svg)
        */
        svg_sprite: {
            basic: {
                expand: true,
                cwd: 'src/images',
                src: ['*.svg'],
                dest: 'build',
                options: {
                    mode: {
                        css: {
                            render: {
                                css: true
                            }
                        }
                    }
                }
            }
        },

        /*
         * WATCH:
         * Watch for changes
        */
        watch: {
            all: {
                options: {
                    livereload: true
                },

                files: ['src/**/*.*', 'index.html'],
                tasks: dev
            },
        },

        /*
         * CONCAT:
         * Merges all JS files into one
        */
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'src/temp/temp.js'
            }
        },

        /*
         * Babel:
         * Runs ES2015 code through babel and transpiles it into 'old' JS
        */
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'build/js/main.js': 'src/temp/temp.js'
                }
            }
        },

        /*
         * CLEAN:
         * Cleans the build folder
        */
        clean: ['build'],

        /*
         * COPY:
         * Copy all assets to the build folder
        */
        copy: {
          main: {
            files: [
              {
                expand: true,
                src: 'src/*.html',
                dest: 'build'
              },
              {
                expand: true,
                cwd: 'src/images',
                src: '*.*',
                dest: 'build/images/'
              }
            ]
          }
        }
    });

    grunt.registerTask('default', dev);
    grunt.registerTask('dev', dev);
}
