import './page.scss';
import tag from 'html-tag-js';
import helpers from 'utils/helpers';

/**
 *
 * @param {String} title
 * @param {boolean|PageOption} [options] options or is secondary?
 * @returns {import('../cordovaPage/cordovaPage').default}
 */
export default function Page(title, options = {}) {
  if (typeof title === 'object') {
    options = title;
    title = undefined;
  } else if (typeof title === 'boolean') {
    options = { secondary: title };
    title = undefined;
  } else if (typeof title === 'string') {
    options.secondary = true;
  }

  const {
    secondary = false,
    id = helpers.uuid(),
  } = options;

  const $page = tag('cordova-page', {
    id,
    attr: {
      secondary,
    },
  });

  const $body = tag('div', {
    className: 'body',
  });

  if (secondary) {
    $page.append(
      tag('header', {
        children: [
          tag('span', {
            className: 'icon-arrow_back',
            onclick() {
              $page.remove();
            },
          }),
          tag('span', {
            className: 'title',
            textContent: title,
          }),
        ],
      }),
    );

    $page.on('show', () => {
      actionStack.push({
        id,
        action: $page.hide,
      });
    });

    $page.on('hide', () => {
      actionStack.remove(id);
    });
  }

  $page.append($body);
  return $page;
}
