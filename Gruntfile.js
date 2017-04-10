module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.initConfig({
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'build/main.css': 'src/sass/base.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass']);
}
