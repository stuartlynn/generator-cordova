# Generator-cordova
A generator for Yeoman.

## Getting started
- Make sure you have the following installed:
    - [yo](https://github.com/yeoman/yo): `npm install -g yo`
    - [grunt-cli](https://github.com/gruntjs/grunt): `npm install -g grunt-cli`
    - [cordova-cli](https://github.com/apache/cordova-cli): `npm install -g cordova`

- Install any SDKs you need for developing platform applications:
    - [iOS](https://developer.apple.com/xcode/)
    - [Android](http://developer.android.com/sdk/index.html#ExistingIDE)
    - etc...

- Install the generator: `npm install -g generator-cordova`
- Run: `yo cordova`

## Usage
Once you have ran `yo cordova` yeoman should now have scaffolded a cordova framework for you.

### Serve to web browser
To deploy as local web server and watch for changes requires the installation of [LiveReload](http://livereload.com/) browser extension.

`grunt serve --platform=ios`: prepares and serves the application as a local web server at [http://localhost:8000/](http://localhost:8000/), watching for changes then preparing/redeploying the web server.

`grunt ripple --platform=ios`: prepares and serves using ripple

### Serve to emulator
`grunt emulate`: builds and emulates all installed platforms

`grunt live-emulate`: builds and emulates all installed platforms, watching for changes then building/redeploying the emulator.

### Serve to device
`grunt device`: builds and runs all installed platforms

`grunt live-device`: builds and runs all installed platforms, watching for changes then building/redeploying.


### Options
`--platform`: sets a platform to build/emulate. eg. `--platform=ios`

`--family`: sets a family to build/emulate. eg. `--family=ipad`

#### Example
`grunt live-emulate --platform=ios --family=ipad`: builds and emulates the `ios` platform using the `ipad` family.

## Experimental webapp Integration
- If you select the yo webapp integration, you'll get the following:
	- Live Reload with auto prepare with `grunt server`
	- Autoprefixer, which will automatically add vendor prefixes (i.e. display: flex will give you all vendor versions, old and new)
	- Sass supprt, CSS, JS, HTML minification
- Your commands are:
	- `grunt run` to run on a device
	- `grunt emulate` to run on an emulator
	- `grunt build` to build the web and cordova project
	- `grunt server` to start a local server (with live reload)
- Options
	- This only supports the use of `--platform=ios` at the moment

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)