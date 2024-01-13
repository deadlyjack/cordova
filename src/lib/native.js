export default {
  /**
   * Get device info
   * @returns {Promise<AndroidVersion>}
   */
  getAndroidVersion() {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'getAndroidVersion', []);
    });
  },
  /**
   * Get webview info
   * @returns {Promise<WebviewInfo>}
   */
  getWebviewInfo() {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'getWebkitInfo', []);
    });
  },
  /**
   * Share file with other apps
   * @param {string} fileUri 
   * @param {string} [filename = '']
   */
  shareFile(fileUri, filename) {
    if (!filename) filename = '';

    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'shareFile', [fileUri, filename]);
    });
  },
  /**
   * Get app info
   * @returns {Promise<AppInfo>}
   */
  getAppInfo() {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'getAppInfo', []);
    });
  },
  /**
   * Request permission from user
   * @param {string} permission
   */
  requestPermission(permission) {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'requestPermission', [permission]);
    });
  },
  /**
   * Request permissions from user
   * @param {string[]} permissions 
   */
  requestPermissions(permissions) {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'requestPermissions', [permissions]);
    });
  },
  /**
   * Check if permission is granted
   * @param {string} permission 
   */
  hasPermission(permission) {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'hasPermission', [permission]);
    });
  },
  /**
   * Open url in browser
   * @param {string} src 
   */
  openInBrowser(src) {
    cordova.exec(null, null, 'Native', 'openInBrowser', [src]);
  },
  /**
   * Sets theme for android
   * @param {string} color
   * @param {'light'|'dark'} type
   */
  setUiTheme(color, type) {
    return new Promise((resolve, reject) => {
      cordova.exec(resolve, reject, 'Native', 'setUiTheme', [color, type]);
    });
  },
  /**
   * Sets handler for intent
   * @param {(e: Intent) => void} handler 
   * @param {(e: Error) => void} onerror 
   */
  setIntentHandler(handler, onerror) {
    cordova.exec(handler, onerror, 'Native', 'setIntentHandler', []);
  },
};
