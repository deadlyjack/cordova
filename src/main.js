import 'html-tag-js/polyfill';
import './main.scss';
import ActionStack from './utils/actionStack';
import Home from './pages/home/home';

document.addEventListener("deviceready", main);

function main() {
  StatusBar.overlaysWebView(true);
  window.actionStack = ActionStack();

  Home();
}