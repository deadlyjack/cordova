import 'html-tag-js/polyfill';
import './main.scss';
import './utils/polyfill';
import "core-js/stable";
import tag from 'html-tag-js';
import ActionStack from './utils/actionStack';
import Home from './pages/home/home';
import confirm from './components/dialogs/confirm/confirm';

document.addEventListener("deviceready", main);

function main() {
  let pages = [];
  window.root = location.href.replace(/(\/index\.html)$/, "").replace(/www\/.*/, "www");
  window.actionStack = ActionStack();

  tag.get("#app").setAttribute("platform", cordova.platformId);
  if (cordova.platformId === "android") {
    StatusBar.backgroundColorByHexString("#292749");
    document.addEventListener("backbutton", onBackButton);
  }

  actionStack.on("push", onPush);
  actionStack.on("remove", onRemove);

  Home();

  function onPush() {

    if (tag.get(".dialog")) return;

    pages.push(...tag.getAll(".page"));
    pages.map($page => {
      if (!$page.placeHolder) $page.placeHolder = tag("span");
      if ($page.isConnected) app.replaceChild($page.placeHolder, $page);
    });
  }

  function onRemove() {
    if (!pages.length) return;
    const $page = pages.splice(pages.length - 1, 1)[0];
    app.replaceChild($page, $page.placeHolder);
  }

  function onBackButton() {
    if (!actionStack.length) {
      if (config.confirmOnExit) {

        setTimeout(() => {
          const closeMessage = typeof window.closeMessage === "function" ? window.getCloseMessage() : '';

          if (closeMessage)
            confirm('Alert', closeMessage).then(closeApp);
          else
            confirm('Alert', 'Exit app?').then(closeApp);
        }, 0);

      } else {
        closeApp();
      }
    }

    function closeApp() {
      if (window.beforeClose) window.beforeClose();
      navigator.app.exitApp();
    }
  }
}