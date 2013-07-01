'use strict';
var cordova = require('cordova');

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'www',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    var device = {
        platform: grunt.option('platform') || 'all',
        family: grunt.option('family') || 'default',
        target: grunt.option('target') || 'emulator'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        jshint: {
            gruntfile: ['Gruntfile.js'],
            files: ['www/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%%= jshint.files %>'],
                tasks: ['jshint']
            },
            livereload: {
                files: ['<%%= jshint.files %>'],
                tasks: ['cordova-emulate-end', 'cordova-buildemulate']
            }
        },
        shell: {
            iossimstart: {
                command: 'ios-sim launch platforms/ios/build/HelloCordova.app --exit' + (device.family !== 'default' ? ' --family ' + device.family : ''),
                options: {
                    stdout: true
                }
            },
            iossimend: {
                command: 'killall -9 "iPhone Simulator"'
            }
        }
    });

    grunt.registerTask('cordova-build', 'Cordova building tasks', function () {
        var done = this.async();

        if (device.platform === 'all') {
            // Build all platforms
            cordova.build(done);
        } else {
            cordova.build(device.platform, done);
        }
    });

    grunt.registerTask('cordova-emulate', 'Cordova emulation tasks', function () {
        var done = this.async();

        if (device.platform === 'all') {
            // Emulate all platforms
            cordova.emulate();
        } else {
            if (device.platform === 'ios') {
                grunt.task.run('shell:iossimstart');
            } else {
                cordova.emulate(device.platform, function() {
                    grunt.task.run('cordova-emulate-end');
                });
            }
       }

       done();
    });

    grunt.registerTask('cordova-emulate-end', 'Cordova emulation tasks', function () {
        if (device.platform === 'all' || device.platform === 'ios') {
            grunt.task.run('shell:iossimend');
        }
    });


    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('cordova-buildemulate', [
        'cordova-build',
        'cordova-emulate'
    ]);

    grunt.registerTask('emulate', ['cordova-buildemulate']);
    grunt.registerTask('liveemulate', ['cordova-buildemulate', 'watch:livereload'])

    grunt.registerTask('default', ['test']);
};