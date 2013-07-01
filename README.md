# Generator-cordova
A generator for Yeoman.

## Getting started
- Make sure you have the following installed:
    - [yo](https://github.com/yeoman/yo): `npm install -g yo`
    - [grunt](https://github.com/gruntjs/grunt): `npm install -g grunt`
    - [cordova-cli](https://github.com/apache/cordova-cli): `npm install -g cordova`
- Install the generator: `npm install generator-cordova`
- Run: `yo cordova`

## Usage
Once you have ran `yo cordova` yeoman should now have scaffolded a cordova framework for you.

`grunt emulate`: builds and emulates all installed platforms

`grunt liveemulate`: builds and emulates all installed platforms, watching for changes and rebuilding/deploying the emulator.

### Options
`--platform`: sets a platform to build/emulate. eg. `--platform=ios`

`--family`: sets a family to build/emulate. eg. `--family=ipad`

#### Example
`grunt liveemulate --platform=ios --family=ipad`: builds and emulates the `ios` platform using the `ipad` family.


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
