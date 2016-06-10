/**
 * Stub of SafariViewManager for Android.
 *
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

var warning = require('warning');

var SafariViewManager = {
  test: function() {
    warning('Not yet implemented for Android.');
  },
  isAvailable() {
    return new Promise(function(resolve, reject) {
        resolve(false);
    });
  }
};

module.exports = SafariViewManager;
