import './home.scss';
import Page from 'components/page/page';
import $view from './home.view';

export default function Home() {
  let count = 0;
  const $page = Page({
    id: 'home',
  });
  $page.content = $view;
  app.append($page);

  $page.get('button').onclick = pushPage;

  function pushPage() {
    ++count;
    const $newPage = Page('Page');
    $newPage.content = <div className='container'>
      <h1>Page {count}</h1>
      <button onclick={pushPage}>Push more</button>
    </div>;

    app.append($newPage);
  }
}
