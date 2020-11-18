import './home.scss';
import $_page from './home.hbs';
import Page from "../../components/page/page";
import Box from '../../components/dialogs/box/box';

export default function HomeInclude() {
  const $page = Page();
  $page.innerHTML = $_page;

  $page.addEventListener("click", clickHandler);

  $page.render();

  /**
   * 
   * @param {MouseEvent} e 
   */
  function clickHandler(e) {
    const $target = e.target;
    const action = $target.getAttribute("action");
    let box;
    switch (action) {
      case 'db-center':
        box = Box("Prompt box", "This is centered prompt box", "center");
        break;

      case 'db-top':
        box = Box("Prompt box", "This prompt box is positioned at top", "top");
        break;

      case 'db-bottom':
        box = Box("Prompt box", "This prompt box is positioned at bottom", "bottom");
        break;

      default:
        break;
    }

    box.render();
    box.$mask.onclick = box.hide;
  }
}