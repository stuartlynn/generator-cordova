'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cordova = require('cordova');
var colors = require('colors');

var CordovaGenerator = module.exports = function CordovaGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        var howTo = '\n' +
            '\nAwesome!'.yellow + ' yeoman should now have scaffolded a cordova framework for you.' +
            '\n' +
            '\n  You can add more plaforms to cordova using: ' + '`cordova platform add <platform>`'.cyan +
            '\n' +
            '\n  To deploy as local web server and watch for changes requires the installation of ' + 'http://livereload.com/'.magenta + ' browser extension.' +
            '\n  This prepares and serves the application as a local web server to ' + 'http://localhost:8000/'.magenta + ', watching for changes then preparing/redeploying the web server.' +
            '\n' +
            '\n      `grunt serve --platform=ios`'.cyan +
            '\n' +
            '\n  To build and emulate all installed platforms, run:' +
            '\n' +
            '\n      `grunt emulate`'.cyan +
            '\n' +
            '\n  To build and emulate all installed platforms, watching for changes then building/redeploying the emulator:' +
            '\n' +
            '\n      `grunt liveemulate`'.cyan +
            '\n' +
            '\n  To set a specific platform to emulate, run with the following options:' +
            '\n' +
            '\n      `--platform`'.cyan + ': sets a platform to build/emulate. eg. ' + '`--platform=ios`'.cyan +
            '\n      `--family`'.cyan + ': sets a family to build/emulate. eg. ' + '`--family=ipad`'.cyan +
            '\n' +
            '\n  For example, to build and emulate the ' + '`ios`'.magenta + ' platform using the ' + '`ipad`'.magenta + ' family:' +
            '\n' +
            '\n      `grunt liveemulate --platform='.cyan + 'ios'.magenta + ' --family='.cyan + 'ipad'.magenta + '`'.cyan +
            '\n';

        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function () {
                console.log(howTo);
            }
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovaGenerator, yeoman.generators.Base);

CordovaGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'appName',
            message: 'What\'s your app called?',
            default: 'HelloCordova'
        },
        {
            name: 'packageName',
            message: 'What\'s the package name of your app?',
            default: 'io.cordova.hellocordova'
        },
        {
            type: 'confirm',
            name: 'ios',
            message: 'Would you like to deploy to iOS?',
            default: true
        },
        {
            type: 'confirm',
            name: 'android',
            message: 'Would you like to deploy to android?',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.packageName = props.packageName;
        this.platforms = [];

        if (props.ios) this.platforms.push('ios');
        if (props.android) this.platforms.push('android');

        cb();
    }.bind(this));
};

CordovaGenerator.prototype.cordovaCreate = function cordovaCreate() {
    console.log("Creating cordova app: " + this.appName);

    cordova.create(process.cwd(), this.packageName, this.appName, this.async());
};

CordovaGenerator.prototype.cordovaAddPlatforms = function cordovaAddPlatforms() {
    if (this.platforms.length > 0) {
        var done = this.async();

        console.log("Adding cordova platforms: " + this.platforms.join(', '));

        cordova.platform('add', this.platforms, function(err) {
            if(err) {
                console.log('Hmm. It looks like you need to install an SDK: '.yellow + err.red);
                process.exit(1);
            }

            done();
        });
    }
};

CordovaGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

CordovaGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('Gruntfile.js');
};
