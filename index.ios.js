/**
 * @providesModule SafariViewManager
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

function publicToDeviceEvent(event) {
  if (['onShow', 'onDismiss', 'onShowComplete', 'onDismissComplete'].indexOf(event) >= 0) {
    return event.replace('on', 'SafariViewOn');
  }
  return false;
}

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
    return new Promise((resolve, reject) => {
      NativeSafariViewManager.dismiss(error => error ? reject(error) : resolve(true));
    });
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
    const deviceEvent = publicToDeviceEvent(event);
    if (deviceEvent) {
      return DeviceEventEmitter.addListener(deviceEvent, listener);
    }
  },

  removeEventListener(event, listener) {
    const deviceEvent = publicToDeviceEvent(event);
    if (deviceEvent) {
      return DeviceEventEmitter.removeListener(deviceEvent, listener);
    }
  }
};
