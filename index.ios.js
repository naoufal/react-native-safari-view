/**
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

const {
  NativeModules,
  processColor
} = require('react-native');
const NativeSafariViewManager = NativeModules.SafariViewManager;

/**
 * High-level docs for the SafariViewManager iOS API can be written here.
 */

var SafariViewManager = {
  show(options) {
    if (options && options.tintColor) {
      options.tintColor = processColor(options.tintColor);
    }

    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.show(options, function(error) {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  },

  dismiss() {
    NativeSafariViewManager.dismiss();
  },

  isAvailable() {
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
