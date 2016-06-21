/**
 * @providesModule SafariViewManager
 * @flow
 */
'use strict';
import {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  processColor
} from 'react-native';
const NativeSafariViewManager = NativeModules.SafariViewManager;

/**
 * High-level docs for the SafariViewManager iOS API can be written here.
 */

export default {
  show(options) {
    if (options && options.tintColor) {
      options.tintColor = processColor(options.tintColor);
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
