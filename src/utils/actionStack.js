import confirm from '../components/dialogs/confirm/confirm';
import config from '../config';

/**
 * @returns {ActionStack}
 */
export default function ActionStack() {

  document.addEventListener('backbutton', pop);

  const stack = [];

  function push(fun) {
    stack.push(fun);
  }

  function pop() {
    if (window.freeze) return;
    const fun = stack.pop();
    if (fun) fun.action();
    else if (config.confirmOnExit) {
      const closeMessage = typeof window.closeMessage === "function" ? window.getCloseMessage() : '';

      if (closeMessage)
        confirm('Alert', closeMessage).then(closeApp);
      else
        confirm('Alert', 'Exit app?').then(closeApp);

    } else {
      closeApp();
    }

    function closeApp() {
      if (window.beforeClose) window.beforeClose();
      navigator.app.exitApp();
    }
  }

  function remove(id) {
    for (let i = 0; i < stack.length; ++i) {
      let action = stack[i];
      if (action.id === id) {
        stack.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  function has(id) {
    for (let act of stack)
      if (act.id === id) return true;
    return false;
  }

  return {
    push,
    pop,
    remove,
    has,
    get length() {
      return stack.length;
    }
  };
}