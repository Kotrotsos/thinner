module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-sass-lint');

    var tasks = ['svg_sprite', 'sass', 'concat', 'babel'];
    var dev = ['svg_sprite', 'sasslint', 'sass', 'concat', 'babel', 'connect', 'watch'];

    grunt.initConfig({
        sasslint: {
            options: {
                configFile: '.sass-lint.yml',
            },
            target: ['src/sass/**/*.scss']
        },
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
        sass: {
            options: {
                style: 'compact',
                lineNumbers: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'src/sass/base.scss'
                }
            }
        },
        svg_sprite: {
            basic: {
                expand: true,
                cwd: 'src/images',
                src: ['**/*.svg'],
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

        watch: {
            all: {
                options: {
                    livereload: true
                },

                files: ['src/**/*.*', 'index.html'],
                tasks: dev
            },
        },

        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'src/temp/temp.js'
            }
        },

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

        copy: {
            main: {
                expand: true,
                src: 'src/*.html',
                dest: 'build/',
            },
        }

    });

    grunt.registerTask('default', tasks);
    grunt.registerTask('dev', dev);
}
