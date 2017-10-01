/**
 * Stub of SafariViewManager for Android.
 *
 * @providesModule SafariViewManager
 */
'use strict';

export default {
  isAvailable() {
    return Promise.reject(new Error('SafariView is unavailable on Android'));
  }
};
