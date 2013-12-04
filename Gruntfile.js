module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: 'sass'
                },
                files: {
                    'css/styles.css' : 'sass/styles.scss'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'watch']);
};