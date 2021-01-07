/**
 * Stub of SafariViewManager for everything but iOS.
 *
 * @providesModule SafariViewManager
 */
'use strict';

export default {
  isAvailable() {
    return Promise.reject(new Error('SafariView is available only on iOS'));
  }
};
