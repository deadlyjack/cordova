import 'html-tag-js/polyfill';
import './main.scss';
import Page from './components/page/page';
import ActionStack from './utils/actionStack';

document.addEventListener("deviceready", main);

function main() {
  StatusBar.overlaysWebView(true);
  window.actionStack = ActionStack();

  const mainPage = Page("Cordova app", {
    secondary: false
  });

  mainPage.render();
}