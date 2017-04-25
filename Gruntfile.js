module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-svg-sprite');

    var tasks = ['svg_sprite', 'sass', 'concat', 'babel'];

    grunt.initConfig({
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
                tasks: tasks
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
                    'build/main.js': 'src/temp/temp.js'
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
}
