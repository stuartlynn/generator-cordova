# Generator-cordova
A generator for Yeoman.

## Getting started
- Make sure you have the following installed:
    - [yo](https://github.com/yeoman/yo): `npm install -g yo`
    - [grunt-cli](https://github.com/gruntjs/grunt): `npm install -g grunt-cli`
    - [cordova-cli](https://github.com/apache/cordova-cli): `npm install -g cordova`

- Install any SDKs you need for developing platform applications:
    - [iOS](https://developer.apple.com/xcode/)
    - [android](http://developer.android.com/sdk/index.html#ExistingIDE)

- Install the generator: `npm install -g generator-cordova`
- Run: `yo cordova`

## Usage
Once you have ran `yo cordova` yeoman should now have scaffolded a cordova framework for you.

### Serve to web browser
To deploy as local web server and watch for changes requires the installation of [LiveReload](http://livereload.com/) browser extension.

`grunt serve --platform=ios`: prepares and serves the application as a local web server at [http://localhost:8000/](http://localhost:8000/), watching for changes then preparing/redeploying the web server.

### Serve to emulator
`grunt emulate`: builds and emulates all installed platforms

`grunt liveemulate`: builds and emulates all installed platforms, watching for changes then building/redeploying the emulator.

### Options
`--platform`: sets a platform to build/emulate. eg. `--platform=ios`

`--family`: sets a family to build/emulate. eg. `--family=ipad`

#### Example
`grunt liveemulate --platform=ios --family=ipad`: builds and emulates the `ios` platform using the `ipad` family.


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
