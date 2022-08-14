export default {
  getWebviewInfo(onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'get-webkit-info', []);
  },
  shareFile(fileUri, filename, onSuccess, onFail) {
    if (typeof filename === 'function') {
      onSuccess = filename;
      onFail = onSuccess;
      filename = '';
    }

    if (!filename) filename = '';
    cordova.exec(onSuccess, onFail, 'Native', 'share-file', [fileUri, filename]);
  },
  getAppInfo(onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'get-app-info', []);
  },
  addShortcut(shortcut, onSuccess, onFail) {
    const {
      id,
      label,
      description,
      icon,
      data,
      action,
    } = shortcut;
    cordova.exec(onSuccess, onFail, 'Native', 'add-shortcut', [id, label, description, icon, action, data]);
  },
  removeShortcut(id, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'remove-shortcut', [id]);
  },
  pinShortcut(id, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'pin-shortcut', [id]);
  },
  getAndroidVersion(onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'get-android-version', []);
  },
  requestPermission(permission, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'request-permission', [permission]);
  },
  requestPermissions(permissions, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'request-permissions', [permissions]);
  },
  hasPermission(permission, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'has-permission', [permission]);
  },
  openInBrowser(src) {
    cordova.exec(null, null, 'Native', 'open-in-browser', [src]);
  },
  launchApp(app, action, value, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'launch-app', [app, action, value]);
  },
  setUiTheme(color, type, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'set-ui-theme', [color, type]);
  },
  setIntentHandler(handler, onerror) {
    cordova.exec(handler, onerror, 'Native', 'set-intent-handler', []);
  },
};
