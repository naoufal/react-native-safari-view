/**
 * Stub of SafariViewManager for Android.
 *
 * @providesModule SafariViewManager
 */
'use strict';

const {NativeModules} = require('react-native');
const NativeSafariViewManager = NativeModules.SafariViewManager;

var SafariViewManager = {
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
