/**
 * Stub of SafariViewManager for Android.
 *
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

var warning = require('warning');
const {NativeModules} = require('react-native');
const NativeSafariViewManager = NativeModules.SafariViewManager;

var SafariViewManager = {
  test: function() {
    warning('Not yet implemented for Android.');
  },
  isAvailable: function() {
    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.isAvailable(function(error) {
        if (error) {
          return reject(error);
        }

        resolve(false);
      });
    });
  }
};

module.exports = SafariViewManager;
