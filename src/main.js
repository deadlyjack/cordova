import 'html-tag-js/polyfill';
import './main.scss';
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
  const pages = [];

  Object.defineProperties(window, {
    actionStack: value(ActionStack()),
    ROOT: value(window.location.href.replace(/(\/index\.html)$/, '').replace(/www\/.*/, 'www')),
    PLATFORM: value(PLATFORM),
    IS_ANDROID: value(PLATFORM === 'android'),
    IS_ELECTRON: value(PLATFORM === 'electron'),
  });

  tag.get('#app').setAttribute('platform', cordova.platformId);
  if (cordova.platformId === 'android') {
    window.StatusBar.backgroundColorByHexString('#292749');
    document.addEventListener('backbutton', onBackButton);
  }

  document.addEventListener('backbutton', actionStack.pop);
  actionStack.on('push', () => onPush(pages));
  actionStack.on('remove', () => onRemove(pages));

  Home();
}

function value(val) {
  return {
    value: val,
    writable: false,
  };
}

function closeApp() {
  if (window.beforeClose) window.beforeClose();
  navigator.app.exitApp();
}

function onPush(pages) {
  if (tag.get('.dialog')) return;
  pages.push(...tag.getAll('.page'));
  pages.forEach(($page) => {
    if (!$page.placeHolder) $page.placeHolder = tag('span');
    if ($page.isConnected) app.replaceChild($page.placeHolder, $page);
  });
}

function onRemove(pages) {
  if (!pages.length) return;
  const $page = pages.splice(pages.length - 1, 1)[0];
  app.replaceChild($page, $page.placeHolder);
}

function onBackButton() {
  if (!actionStack.length) {
    if (config.confirmOnExit) {
      setTimeout(() => {
        const closeMessage = typeof window.closeMessage === 'function' ? window.getCloseMessage() : '';

        if (closeMessage) confirm('Alert', closeMessage).then(closeApp);
        else confirm('Alert', 'Exit app?').then(closeApp);
      }, 0);
    } else {
      closeApp();
    }
  }
}
