module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        jshint: {
            files: "src/*.js"
        },

        qunit: {
            all: ["tests/base.html"]
        },

        uglify: {
            target: {
                files: [{
                    src: 'src/dataDashCore.js',
                    dest: 'dist/dataDashCore.js'
                }, {
                    src: 'src/dataDashArithmetic.js',
                    dest: 'dist/dataDashArithmetic.js'
                }, {
                    src: 'src/dataDashUnitConversions.js',
                    dest: 'dist/dataDashUnitConversions.js'
                }]
            }
        }



    });

    // Default task(s).
    grunt.registerTask('travis', ['jshint', 'qunit']);

};