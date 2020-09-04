import './prompt.scss';
import autosize from 'autosize';
import $_prompt from './prompt.hbs';
import Box from '../box/box';

/**
 * Asks user for input
 * @param {String} title
 * @param {Object} [options]
 * @param {"number"|"string"} [options.type]
 * @param {boolean} [options.required]
 * @param {RegExp} [options.match]
 * @returns {Promise<String>}
 */
export default function prompt(title, options) {
  return new Promise((resolve, reject) => {
    const box = Box(title, $_prompt);
    const $textarea = box.$body.get("#prompt-input");
    const $error = box.$body.querySelector(".error");

    box.$body.onclick = handleClick;
    box.render();
    autosize($textarea);
    $textarea.focus();

    /**
     * @param {MouseEvent} e 
     */
    function handleClick(e) {
      const $target = e.target;
      if (!($target instanceof HTMLElement)) return;
      const action = $target.getAttribute("action");
      if (!action) return;

      if (action === "cancel") box.hide();
      else if (action === "ok") {
        let value = $textarea.value;

        if (options.required && !value) return showError("Required!");
        if (options.match && !options.match.test(value)) return showError("Invalid value!");
        if (options.type === "number") value = +value;
        box.hide();
        resolve(value);
      }
    }

    function showError(str) {
      $error.textContent = str;
      $textarea.onclick = function () {
        this.onclick = null;
        showError("");
      };
    }
  });
}