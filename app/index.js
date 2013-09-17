'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var webappGen = require('generator-webapp');
var cordovaCLI = require('cordova');
var plugman = require('plugman');
var _ = require('lodash');
var chalk = require('chalk');

var CordovaGenerator = module.exports = function CordovaGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {

        if (!this.runwebapp) {
            var howTo = '\n' +
                chalk.yellow('\nAwesome!') + ' yeoman should now have scaffolded a cordova framework for you.' +
                '\n' +
                '\n  You can add more plaforms to cordova using: ' + chalk.cyan('`cordova platform add <platform>`') +
                '\n' +
                '\n  To deploy as local web server and watch for changes requires the installation of ' + chalk.magenta('http://livereload.com/') + ' browser extension.' +
                '\n  This prepares and serves the application as a local web server to ' + chalk.magenta('http://localhost:8000/') + ', watching for changes then preparing/redeploying the web server.' +
                '\n' +
                chalk.cyan('\n      `grunt serve --platform=ios`') +
                '\n' +
                chalk.cyan('\n      `grunt ripple --platform=ios`') +
                '\n' +
                '\n' +
                '\n  To build and emulate all installed platforms, run:' +
                '\n' +
                chalk.cyan('\n      `grunt emulate`') +
                '\n' +
                '\n  To build and emulate all installed platforms, watching for changes then building/redeploying the emulator:' +
                '\n' +
                chalk.cyan('\n      `grunt live-emulate`') +
                '\n' +
                '\n' +
                '\n  To build and run all installed platforms on connected devices, run:' +
                '\n' +
                chalk.cyan('\n      `grunt device`') +
                '\n' +
                '\n  To build and run all installed platforms on connected devices, watching for changes then building/redeploying the emulator:' +
                '\n' +
                chalk.cyan('\n      `grunt live-device`') +
                '\n' +
                '\n' +
                '\n  To set a specific platform to emulate or run, execute with the following options:' +
                '\n' +
                chalk.cyan('\n      `--platform`') + ': sets a platform to build/emulate. eg. ' + chalk.cyan('`--platform=ios`') +
                chalk.cyan('\n      `--family`') + ': sets a family to build/emulate. eg. ' + chalk.cyan('`--family=ipad`') +
                '\n' +
                '\n  For example, to build and emulate the ' + chalk.magenta('`ios`') + ' platform using the ' + chalk.magenta('`ipad`') + ' family:' +
                '\n' +
                chalk.cyan('\n      `grunt live-emulate --platform=') + chalk.magenta('ios') + chalk.cyan(' --family=') + chalk.magenta('ipad') + chalk.cyan('`') +
                '\n';

        } else {
            process.chdir(this.cwd + '/yeoman');
        }

        this.installDependencies(
            {
                skipInstall: options['skip-install'],
                callback: function () {
                    console.log(howTo);
                }
            }
        );
    }.bind(this));

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovaGenerator, yeoman.generators.Base);

CordovaGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    // We do some working directory hoping, so keep a track where we start
    this.cwd = process.cwd();

    var prompts = [
        {
            name: 'appname',
            message: 'What is the name of your app? (Spaces aren\'t allowed)',
            default: 'HelloCordova'
        },
        {
            name: 'packagename',
            message: 'What would you like the package to be?',
            default: 'io.cordova.hellocordova'
        },
        {
            type: 'checkbox',
            name: 'platforms',
            message: 'What platforms would you like to add support for?',
            choices: [
                {
                    name: 'Android',
                    value: 'android',
                    checked: true
                },
                {
                    name: 'iOS',
                    value: 'ios',
                    checked: true
                },
                {
                    name: 'Blackberry 10',
                    value: 'blackberry10',
                    checked: false
                },
                {
                    name: 'Windows Phone 7',
                    value: 'wp7',
                    checked: false
                },
                {
                    name: 'Windows Phone 8',
                    value: 'wp7',
                    checked: false
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'plugins',
            message: 'What plugins would you like to include by default?',
            // Find these values using command 'plugman search <keyword>'
            // Find these values here: https://git-wip-us.apache.org/repos/asf
            choices: [
                {
                    name: 'Device Info',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git',
                    checked: false
                },
                {
                    name: 'Camera',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git',
                    checked: false
                },
                {
                    name: 'Contacts',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-contacts.git',
                    checked: false
                },
                {
                    name: 'Dialogs',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git',
                    checked: false
                },
                {
                    name: 'Geolocation',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git',
                    checked: false
                },
                {
                    name: 'In App Browser',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git',
                    checked: false
                },
                {
                    name: 'Audio Handler (a.k.a Media on Cordova Docs)',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git',
                    checked: false
                },
                {
                    name: 'Media Capture',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git',
                    checked: false
                },
                {
                    name: 'Network Information',
                    value: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git',
                    checked: false
                }
            ]
        },
        {
            type: 'confirm',
            name: 'runwebapp',
            message: chalk.red('[Experimental]') + ': Would you like to run \'yo webapp\' and auto-setup with Cordova (if not we\'ll give you a more generic Grunt file)?',
            default: false
        }
    ];

    this.prompt(prompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        cb();
    }.bind(this));
};

CordovaGenerator.prototype.cordovaCreate = function cordovaCreate() {
    console.log("Creating cordova app: " + this.appname);
    var cb = this.async();
    try {
        cordovaCLI.create(process.cwd(), this.packagename, this.appname, cb);
    } catch (err) {
        console.error('Failed to create cordova proect: ' + err);
        process.exit(1);
    }
};

CordovaGenerator.prototype.addPlatforms = function addPlatforms() {
    if (typeof this.platforms === 'undefined') {
        return;
    }

    console.log('Adding requested platforms to the Cordova project');

    var cb = this.async();
    addPlatformsToCordova(0, this.platforms, cb);
};

function addPlatformsToCordova(index, platforms, cb) {
    if (!(index < platforms.length)) {
        cb();
        return;
    }

    console.log('  Adding ' + platforms[index]);

    try {
        cordovaCLI.platform('add', platforms[index], function () {
            addPlatformsToCordova(index + 1, platforms, cb);
        });
    } catch (err) {
        console.error('Failed to add platform ' + platforms['index'] + ': ' + err);
        process.exit(1);
    }
}

CordovaGenerator.prototype.addPlugins = function addPlugins() {
    console.log('Installing the Cordova plugins');

    var cb = this.async();
    addPluginsToCordova(0, this.plugins, cb);
}

function addPluginsToCordova(index, plugins, cb) {
    if (!(index < plugins.length)) {
        cb();
        return;
    }

    cordovaCLI.plugin('add', plugins[index], function () {
        addPluginsToCordova(index + 1, plugins, cb);
    });
}

// Create Yeoman WebApp
CordovaGenerator.prototype.runYeomanWebApp = function runYeomanWebApp() {
    if (!this.runwebapp) {
        return;
    }

    console.log('Starting to set up the Yeoman file structure');

    process.chdir(this.cwd);

    this.mkdir('yeoman');
    this.copy(this.cwd + '/www/config.xml', 'yeoman/app/config.xml');

    var cb = this.async();
    try {
        // Change back to the root directory
        process.chdir(this.cwd + '/yeoman');
        var that = this;

        this.env.run('webapp', { 'skip-welcome-message': true, 'skip-install': true, 'skip-install-message': true}, function () {
            updatePackageFile.bind(that)(function () {
                // Success
                updateGruntFile.bind(that)(function () {
                    // Success
                    process.chdir(that.cwd);
                    cb();
                }, function (err) {
                    // Error
                    console.error('Ooops. There was a problem reading Gruntfile.js: ' + err);
                    process.exit(1);
                });
            }, function (err) {
                // Error
                console.error('Ooops. There was a problem reading package.json: ' + err);
                process.exit(1);
            });
        });
    } catch (err) {
        console.error('Failed to run Yeoman Generator: ' + err);
        process.exit(1);
    }
};

function updatePackageFile(successCb, errorCb) {
    console.log('Updating the package.json file');
    var fs = require('fs');
    var fileLocation = this.cwd + '/yeoman/package.json';

    fs.readFile(fileLocation, 'utf8', function (err, data) {
        if (err) {
            errorCb(err);
            return;
        }

        // Add cordova to package list
        var pattern = /"devDependencies"\s*:\s*{/g;
        var regex = new RegExp(pattern);
        data = data.replace(regex, "\"devDependencies\": {\n    \"cordova\": \"~3.0.4\",");

        fs.writeFile(fileLocation, data, 'utf8', function (err) {
            if (err) {
                errorCb(err);
            }

            successCb();
        });
    });
}

function updateGruntFile(successCb, errorCb) {
    console.log('Updating Gruntfile.js');
    var fs = require('fs');
    var gruntFileLocation = this.cwd + '/yeoman/Gruntfile.js';

    fs.readFile(this.sourceRoot() + '/GruntTasks.js', 'utf8', function (err, data) {
        if (err) {
            errorCb(err);
            return;
        }

        updateGruntFileWithNewTasks(gruntFileLocation, data, successCb, errorCb);
    });
}

function updateGruntFileWithNewTasks(gruntFileLocation, newTasks, successCb, errorCb) {
    var fs = require('fs');
    fs.readFile(gruntFileLocation, 'utf8', function (err, data) {
        if (err) {
            errorCb(err);
            return;
        }

        // Swap out dist directory for www
        var pattern = /dist\s*:\s*'dist'/g;
        var regex = new RegExp(pattern);
        data = data.replace(regex, "dist: '../www'");

        // Force the clean to work in www
        pattern = /clean\s*:\s*{\s*dist\s*:\s*{/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, "clean: {\n            options: {\n                force: true\n            },\n            dist: {");

        // Include the xml config file for copying over
        pattern = /.{ico,png,txt}/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, ".{ico,png,txt,xml}");

        // Require Cordova module
        pattern = /'use strict'\s*;/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, "'use strict';\nvar cordova = require('cordova');");

        // Add Cordova Config
        pattern = /grunt.initConfig\(/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, "var cordovaConfig = {\n        platform: grunt.option('platform')\n    };\n\n    grunt.initConfig(");

        // Rename the current build task to buildWeb
        pattern = /grunt.registerTask\(\s*'build'\s*,/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, "grunt.registerTask('buildweb',");

        // Add Additional Tasks
        // Rename the current build task to buildWeb
        pattern = /grunt.registerTask\(\s*'default'\s*,/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, newTasks + "\n\n    grunt.registerTask('default',");

        // Add Watch Task

        var stringReplace = " watch: {\n            cordova: {" +
            "\n                files: [" +
            "\n                    '<%= yeoman.app %>/*.html'," +
            "\n                    '.tmp/styles/{,*/}*.css'," +
            "\n                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'," +
            "\n                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'" +
            "\n                ]," +
            "\n                tasks: ['copy:auto', 'cordova-prepare']" +
            "\n            },";

        pattern = /watch\s*:\s*\{/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, stringReplace);

        stringReplace = " copy: {" +
            "\n            auto: {" +
            "\n                files: [{" +
            "\n                    expand: true," +
            "\n                    dot: true," +
            "\n                    cwd: '<%= yeoman.app %>'," +
            "\n                    dest: '<%= yeoman.dist %>'," +
            "\n                    src: [" +
            "\n                        '{,*/}*.*'" +
            "\n                    ]" +
            "\n                }]" +
            "\n            },";

        pattern = /copy\s*:\s*\{/g;
        regex = new RegExp(pattern);
        data = data.replace(regex, stringReplace);

        fs.writeFile(gruntFileLocation, data, 'utf8', function (err) {
            if (err) {
                errorCb(err);
            }

            successCb();
        });
    });
}

CordovaGenerator.prototype.app = function app() {
    if (this.runwebapp) {
        return;
    }

    process.chdir(this.cwd);

    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

CordovaGenerator.prototype.projectfiles = function projectfiles() {
    if (this.runwebapp) {
        return;
    }

    process.chdir(this.cwd);

    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.template('Gruntfile.js');
};
