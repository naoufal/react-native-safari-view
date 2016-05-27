/**
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';

const {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
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
  },

  addEventListener(event, listener) {
    if (event === 'onShow') {
      return DeviceEventEmitter.addListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      return NativeAppEventEmitter.addListener('SafariViewOnDismiss', listener);
    }
  },

  removeEventListener(event, listener) {
    if (event === 'onShow') {
      DeviceEventEmitter.removeListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      NativeAppEventEmitter.removeListener('SafariViewOnDismiss', listener);
    }
  }
};

module.exports = SafariViewManager;
