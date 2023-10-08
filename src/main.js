import 'styles/main.scss';
import 'styles/icons.scss';

import './components/customElements';
import 'html-tag-js/dist/polyfill';
import 'core-js/stable';

import tag from 'html-tag-js';
import dark from 'themes/dark';
import theme from 'lib/theme';
import Home from 'pages/home';
import native from 'lib/native';
import actionStack from 'lib/actionStack';

document.addEventListener('deviceready', main);

function main() {
  const { scheme: { primaryColor }, type } = theme(dark, 'dark');
  const PLATFORM = cordova.platformId;

  /* Setting global variables */
  Object.defineProperties(window, {
    ROOT: value(
      window.location.href
        .replace(/(\/index\.html)$/, '')
        .replace(/www\/.*/, 'www'),
    ),
    PLATFORM: value(PLATFORM),
    IS_ANDROID: value(PLATFORM === 'android'),
    IS_ELECTRON: value(PLATFORM === 'electron'),
  });

  /* Sets platform attribute to body tag for platform specific styling */
  tag.get('#app').setAttribute('platform', cordova.platformId);

  if (IS_ANDROID) {
    native.setUiTheme(primaryColor, type);
    /* Shows app exit confirmation when App is to exit. */
    document.addEventListener('backbutton', onBackButton);
  }

  /* Goes back when back button is pressed */
  document.addEventListener('backbutton', actionStack.pop);

  /* Pushing home page */
  Home();
}

/**
 * Returns object for defining new property on line 22
 * @param {any} val
 * @returns
 */
function value(val) {
  return {
    value: val,
    writable: false,
  };
}

/**
 * Shows exit message and close app when confirmed
 */
function onBackButton() {
  if (!actionStack.length) {
    navigator.app.exitApp();
  }
}
