/**
 * @providesModule SafariViewManager
 */
'use strict';
import {
  NativeModules,
  NativeEventEmitter,
  processColor
} from 'react-native';
const NativeSafariViewManager = NativeModules.SafariViewManager;
const moduleEventEmitter = new NativeEventEmitter(NativeSafariViewManager);

/**
 * High-level docs for the SafariViewManager iOS API can be written here.
 */

export default {
  show(options) {
    if (options && options.tintColor) {
      options.tintColor = processColor(options.tintColor);
    }
    if (options && options.barTintColor) {
      options.barTintColor = processColor(options.barTintColor);
    }

    return new Promise((resolve, reject) => {
      NativeSafariViewManager.show(options, (error) => {
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
    return new Promise((resolve, reject) => {
      NativeSafariViewManager.isAvailable((error) => {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  },

  addEventListener(event, listener) {
    return moduleEventEmitter.addListener(event, listener);
  },

  removeEventListener(event, listener) {
    moduleEventEmitter.removeListener(event, listener);
  }
};
