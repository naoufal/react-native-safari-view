/**
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

var NativeModules = require('react-native').NativeModules;
var NativeSafariViewManager = NativeModules.SafariViewManager;

/**
 * High-level docs for the SafariViewManager iOS API can be written here.
 */

var SafariViewManager = {
  show: function(options) {
    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.show(options, function(error) {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  },

  isAvailable: function() {
    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.isAvailable(function(error) {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  }
};

module.exports = SafariViewManager;
