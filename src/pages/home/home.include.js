import './home.scss';
import page from './home.hbs';
import Page from '../../components/page/page';
import Box from '../../components/dialogs/box/box';
import Page1 from '../page1/page1';

export default function HomeInclude() {
  const $page = Page();
  $page.innerHTML = page;

  $page.addEventListener('click', clickHandler);
  $page.render();

  /**
   *
   * @param {MouseEvent} e
   */
  function clickHandler(e) {
    const $target = e.target;
    const action = $target.getAttribute('action');
    let box;
    switch (action) {
      case 'db-center':
        box = Box('Prompt box', 'This is centered prompt box', 'center');
        break;

      case 'db-top':
        box = Box('Prompt box', 'This prompt box is positioned at top', 'top');
        break;

      case 'db-bottom':
        box = Box('Prompt box', 'This prompt box is positioned at bottom', 'bottom');
        break;

      case 'page1':
        Page1();
        break;

      default:
        break;
    }

    if (box) {
      box.render();
      box.$mask.onclick = box.hide;
    }
  }
}
