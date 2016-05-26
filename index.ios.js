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

var listeners = {
  onShow: {},
  onDismiss: {}
};

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
      listeners[event][listener] = DeviceEventEmitter.addListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      listeners[event][listener] = NativeAppEventEmitter.addListener('SafariViewOnDismiss', listener);
    }
  },

  removeEventListener(event, listener) {
    if (!listeners[event] || !listeners[event][listener]) {
      return;
    }

    listeners[event][listener].remove();
    listeners[event][listener] = null;
  }
};

module.exports = SafariViewManager;
