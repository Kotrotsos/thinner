module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.initConfig({
        sass: {
            options: {
                style: 'compact',
                lineNumbers: true
            },
            dist: {
                files: {
                    'build/main.css': 'src/sass/base.scss'
                }
            }
        },
        watch: {
            all: {
                files: ['src/**/*.*'],
                tasks: ['sass', 'babel'],
                options: {
                    spawn: true,
                    livereload: {
                        host: 'localhost',
                        port: 9000
                    }
                },
            },
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'build/main.js': 'src/js/*.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'babel']);
}
