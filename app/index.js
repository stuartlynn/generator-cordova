'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cordova = require('cordova');

var CordovaGenerator = module.exports = function CordovaGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
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
        console.log("Adding cordova platforms: " + this.platforms.join(', '));

        cordova.platform('add', this.platforms, this.async());
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
    this.template('Gruntfile.js');
};
