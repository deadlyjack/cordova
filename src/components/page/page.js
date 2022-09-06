import './page.scss';
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

  /**
   * @type {import('../cordovaPage/cordovaPage').default}
   */
  const $page = <cordova-page id={id} attr-secondary={secondary}></cordova-page>;
  const $body = <div className='body'></div>;

  if (secondary) {
    $page.append(<header>
      <span className='icon-arrow_back' onclick={() => $page.destroy()}></span>
      <span className='title'>{title}</span>
    </header>);

    $page.on('show', () => {
      actionStack.push({
        id,
        action: () => $page.destroy(),
      });
    });

    $page.on('hide', () => {
      actionStack.remove(id);
    });
  }

  $page.append($body);
  return $page;
}
