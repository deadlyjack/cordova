export default {
  getWebviewInfo(onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'getWebkitInfo', []);
  },
  shareFile(fileUri, filename, onSuccess, onFail) {
    if (typeof filename === 'function') {
      onSuccess = filename;
      onFail = onSuccess;
      filename = '';
    }

    if (!filename) filename = '';
    cordova.exec(onSuccess, onFail, 'Native', 'shareFile', [fileUri, filename]);
  },
  getAppInfo(onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'getAppInfo', []);
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
    cordova.exec(onSuccess, onFail, 'Native', 'addShortcut', [id, label, description, icon, action, data]);
  },
  removeShortcut(id, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'removeShortcut', [id]);
  },
  pinShortcut(id, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'pinShortcut', [id]);
  },
  requestPermission(permission, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'requestPermission', [permission]);
  },
  requestPermissions(permissions, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'requestPermissions', [permissions]);
  },
  hasPermission(permission, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'hasPermission', [permission]);
  },
  openInBrowser(src) {
    cordova.exec(null, null, 'Native', 'openInBrowser', [src]);
  },
  setUiTheme(color, type, onSuccess, onFail) {
    cordova.exec(onSuccess, onFail, 'Native', 'setUiTheme', [color, type]);
  },
  setIntentHandler(handler, onerror) {
    cordova.exec(handler, onerror, 'Native', 'setIntentHandler', []);
  },
};
