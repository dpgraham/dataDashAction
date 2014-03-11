module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({

        jshint: {
            files: "src/*.js"
        }

    });

    // Default task(s).
    // grunt.registerTask('test', ['qunit']);

};