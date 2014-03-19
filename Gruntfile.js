module.exports = function(grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({

        jshint: {
            files: "src/*.js"
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "../dataDashAction"
                }
            },

            keepalive: {
                options: {
                    port: 9000,
                    base: "../dataDashAction",
                    keepalive: true
                }
            }
        },


        qunit: {
            all: {
                options: {
                    urls: [
                        "http://localhost:9001/tests/base.html"
                    ]
                }
            }
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
    grunt.registerTask('travis', ['connect:server', 'jshint', 'qunit']);

};