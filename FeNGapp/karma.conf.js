// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var port = 9876;
var chromePort = 9222;
var timestamp = Date.now();
var path = require("path")

var testResultsDir = 'testresults';
var coverageReportsDir = 'coverage';
var coverageReportsFile = 'cobertura.xml';
var testResultsFile = 'testresults';


console.log('Karma port is ' + port);
console.log('Chrome remote-debugging-port is ' + chromePort);
console.log('Test results folder is : ' +  path.join(__dirname,'testresults'));

module.exports = function (config) {
  config.set({
    basePath: process.cwd(),
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-tfs-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--remote-debugging-port=' + chromePort
        ]
      },
      ChromeWithDebugEnabled: {
        base: 'Chrome',
        flags: [
          '--remote-debugging-port=9222'
        ]
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, coverageReportsDir),
      reports: ['html','text-summary', 'cobertura'],
      fixWebpackSourcePaths: true,
      'report-config' :{
        html: {
          subdir: 'html'
        },
        cobertura: {
          file: coverageReportsFile
        }
      }
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'tfs','html']
      : ['progress', 'kjhtml', 'tfs','html'],
    tfsReporter: {
      outputDir: path.join(__dirname,'testresults'), // where to put the reports
    },
    htmlReporter: {
      outputDir: path.join(__dirname,'testresults/html'), // where to put the reports
    },
    port: port,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 100,
    browserNoActivityTimeout: 100000
  });
};
