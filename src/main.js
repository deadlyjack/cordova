import './main.scss';
import './icons.scss';

import 'html-tag-js/dist/polyfill';
import './utils/polyfill';
import 'core-js/stable';

import tag from 'html-tag-js';
import ActionStack from './utils/actionStack';
import Home from './pages/home/home';
import confirm from './components/dialogs/confirm/confirm';
import config from './config';

document.addEventListener('deviceready', main);

function main() {
  const PLATFORM = cordova.platformId;
  /* Stores hidden pages */
  const pages = [];

  /* Setting global variables */
  Object.defineProperties(window, {
    actionStack: value(ActionStack()),
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
    /* Changing statusbar color according to theme */
    window.StatusBar.backgroundColorByHexString('#292749');
    /* Changing statusbar text color to light */
    window.StatusBar.styleLightContent();
    /* Shows app exit confirmation when App is to exit. */
    document.addEventListener('backbutton', onBackButton);
  }

  /* Goes back when back button is pressed */
  document.addEventListener('backbutton', actionStack.pop);
  /* Removes all pages from DOM when new page is pushed better performance */
  actionStack.on('push', () => onPush(pages));
  /* Addes last page to DOM When top page is removed */
  actionStack.on('remove', () => onRemove(pages));

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
 * Closes app, and shows exit message if enabled
 */
function closeApp() {
  if (window.beforeClose) window.beforeClose();
  navigator.app.exitApp();
}

/**
 * Handle action stack push event
 * @param {Array<Page>} pages
 * @returns
 */
function onPush(pages) {
  if (tag.get('.dialog')) return;
  pages.push(...tag.getAll('.page'));
  pages.forEach(($page) => {
    if (!$page.placeHolder) $page.placeHolder = tag('span');
    if ($page.isConnected) app.replaceChild($page.placeHolder, $page);
  });
}

/**
 * Handle action stack remove event
 * @param {Array<Page>} pages
 * @returns
 */
function onRemove(pages) {
  if (!pages.length) return;
  const $page = pages.splice(pages.length - 1, 1)[0];
  app.replaceChild($page, $page.placeHolder);
}

/**
 * Shows exit message and close app when confirmed
 */
function onBackButton() {
  if (!actionStack.length) {
    if (config.confirmOnExit) {
      setTimeout(() => {
        const closeMessage = typeof window.closeMessage === 'function'
          ? window.getCloseMessage()
          : '';

        if (closeMessage) confirm('Alert', closeMessage).then(closeApp);
        else confirm('Alert', 'Exit app?').then(closeApp);
      }, 0);
    } else {
      closeApp();
    }
  }
}
