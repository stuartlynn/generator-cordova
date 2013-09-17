grunt.registerTask('cordova-prepare', 'Prepare the native application', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.prepare(done);
        } else {
            cordova.prepare(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-build', 'Build the native application', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.build(done);
        } else {
            cordova.build(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-emulate', 'Emulate the application', function(){
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.emulate(done);
        } else {
            cordova.emulate(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('build', [
        'buildweb',
        'cordova-build'
    ]);

    grunt.registerTask('emulate', [
        'build',
        'cordova-emulate'
    ]);

    grunt.registerTask('cordova-run', 'Run the application on a device', function() {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.run(done);
        } else {
            cordova.run(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('run', [
        'build',
        'cordova-run'
    ]);