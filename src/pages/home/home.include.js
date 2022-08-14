import view from './home.view';
import Page from '../../components/page/page';

export default function HomeInclude() {
  let count = 0;
  const $page = Page({
    id: 'home',
  });
  $page.content = view();
  app.append($page);

  app.addEventListener('click', (e) => {
    const { action } = e.target.dataset;
    if (action === 'push-page') {
      const $newPage = Page(`Page ${++count}`);
      $newPage.content = view();
      app.append($newPage);
      $newPage.on('hide', () => {
        --count;
      });
    }
  });
}
