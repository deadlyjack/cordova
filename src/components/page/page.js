import './page.scss';
import $_page from './page.hbs';

import tag from 'html-tag-js';
import mustach from 'mustache';


import helpers from '../../utils/helpers';
import config from '../../config';

/**
 * 
 * @param {String} title 
 * @param {boolean|PageOption} [options]
 */
export default function Page(title, options) {
  let id = helpers.uuid(),
    secondary = !!title;

  if (typeof options === "boolean") {
    secondary = options;
  } else if (typeof options === "object") {
    id = options.id;
    secondary = options.id;
  }

  if (!secondary)
    id = "main";

  const $page = tag.parse(mustach.render($_page, {
    id,
    title,
    secondary
  }));

  if (!secondary)
    return {
      id,
      get $el() {
        return $page;
      }
    };
  else
    return {
      id,
      render() {

        actionStack.push({
          id,
          action: this.hide
        });
        const onclick = this.onclick;
        $page.addEventListener("click", e => {
          const $target = e.target;
          if ($target instanceof HTMLElement) {
            const action = $target.getAttribute("action");
            if (action === "back") {
              this.hide();
              actionStack.remove(id);
            }
          }
          onclick.call($page, e);
        });

        app.append($page);

      },
      hide() {
        if (options.onhide) options.onhide();
        $page.classList.add('hide');
        setTimeout($page.remove.bind($page), config.pageTransitionTimeout);
      },
      /**
       * @this HTMLElement
       * @param {MouseEvent} e 
       */
      onclick(e) {

      },
      get $el() {
        return $page;
      }
    };
}