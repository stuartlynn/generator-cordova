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
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig
    });

    grunt.task.registerTask('cordovaBuild', 'Cordova building tasks', function(platforms) {
        var done = this.async();

        if(arguments.length == 0) {
            // Build all platforms
            cordova.build(done);
        } else {
            cordova.build(platforms, done);
        }
    });

    grunt.task.registerTask('cordovaEmulate', 'Cordova emulation tasks', function(platforms) {
        var done = this.async();

        if(arguments.length == 0) {
            // Build all platforms
            cordova.emulate(done);
        } else {
            cordova.emulate(platforms, done);
        }
    })
};