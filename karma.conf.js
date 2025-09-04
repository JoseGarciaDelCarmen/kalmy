const { join } = require('path');

module.exports = function (config) {
  const isCI = !!process.env.CI;

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],

    client: {
      jasmine: {},
      clearContext: false,
    },

    reporters: isCI ? ['dots', 'coverage'] : ['progress', 'kjhtml', 'coverage'],

    coverageReporter: {
      dir: join(__dirname, './coverage/kalmy'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'lcovonly' }, { type: 'text-summary' }],
      fixWebpackSourcePaths: true,
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    // En local: recarga automática; en CI: una sola corrida
    autoWatch: !isCI,
    singleRun: isCI,
    restartOnFileChange: !isCI,

    // Lanzador sin sandbox para CI
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222',
          '--disable-software-rasterizer',
        ],
      },
    },

    // Usa el launcher sin sandbox en CI; Chrome normal en local
    browsers: [isCI ? 'ChromeHeadlessNoSandbox' : 'Chrome'],
  });
};
