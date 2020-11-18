import './page.scss';
import $_page from './page.hbs';

import tag from 'html-tag-js';
import mustach from 'mustache';

import helpers from '../../utils/helpers';
import config from '../../config';

/**
 * 
 * @param {String} title 
 * @param {boolean|PageOption} [options] options or is secondary?
 * @returns {Page}
 */
export default function Page(title, options) {
  let id = helpers.uuid(),
    secondary = false;

  if (typeof options === "boolean") {
    secondary = options;
  } else if (typeof options === "object") {
    id = options.id;
    secondary = options.secondary;
  } else {
    options = {};
  }

  if (!secondary)
    id = "main";

  const content = mustach.render($_page, {
    id,
    title,
    secondary
  });
  const $page = tag.parse(content);

  function render() {

    if (secondary) actionStack.push({
      id,
      action: this.hide
    });

    $page.addEventListener("click", e => {
      const $target = e.target;
      if ($target instanceof HTMLElement) {
        const action = $target.getAttribute("action");
        if (action === "back") {
          this.hide();
          actionStack.remove(id);
        }
      }
    });

    app.append(this);

  }

  function hide() {
    if (options.onhide) options.onhide();
    $page.classList.add('hide');
    setTimeout($page.remove.bind($page), config.pageTransitionTimeout);
  }

  function setContent(content) {
    const $body = this.get(".page-body");
    if (typeof content === "string") $body.innerHTML = content;
    if (content instanceof HTMLElement) $body.append(content);
  }

  function getContent() {
    return this.get("page-body").innerHTML;
  }

  Object.defineProperty($page, "id", {
    value: id
  });
  Object.defineProperty($page, "render", {
    value: render
  });
  Object.defineProperty($page, "hide", {
    value: hide
  });
  Object.defineProperty($page, "content", {
    set: setContent,
    get: getContent
  });

  return $page;
}