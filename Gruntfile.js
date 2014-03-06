module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({

        qunit: {

        }

    });

    // Default task(s).
    grunt.registerTask('test', ['qunit']);

};