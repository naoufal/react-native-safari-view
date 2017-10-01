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
const eventEmitter = new NativeEventEmitter(NativeSafariViewManager);

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
    if (event === 'onShow') {
      return eventEmitter.addListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      return eventEmitter.addListener('SafariViewOnDismiss', listener);
    } else {
      console.warn(`Trying to subscribe to unknown event: ${event}`);
      return {
        remove: () => {}
      };
    }
  },

  removeEventListener(event, listener) {
    if (event === 'onShow') {
      eventEmitter.removeListener('SafariViewOnShow', listener);
    } else if (event === 'onDismiss') {
      eventEmitter.removeListener('SafariViewOnDismiss', listener);
    }
  }
};
