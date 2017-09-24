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

const subscriptions = {
  onShow: new Map(),
  onDismiss: new Map()
};

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
    if (!subscriptions[event]) {
      console.warn(`Trying to subscribe to unknown event: "${event}"`);
      return;
    }
    const subscription = eventEmitter.addListener(event, listener);
    subscriptions[event].set(listener, subscription);
  },

  removeEventListener(event, listener) {
    if (!subscriptions[event]) {
      console.warn(`Trying to subscribe to unknown event: "${event}"`);
      return;
    }
    const subscription = subscriptions[event].get(listener);
    if (subscription) {
      subscription.remove();
      subscriptions[event].delete(listener);
    }
  }
};
