/**
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

var NativeSafariViewManager = require('NativeModules').SafariViewManager;
var invariant = require('invariant');

/**
 * High-level docs for the SafariViewManager iOS API can be written here.
 */

var SafariViewManager = {
  show: function(options) {
    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.show(options, function(error, success) {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  },

  isAvailable: function(options) {
    return new Promise(function(resolve, reject) {
      NativeSafariViewManager.isAvailable(function(error, success) {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  },
};

module.exports = SafariViewManager;
