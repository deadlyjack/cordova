import tag from 'html-tag-js';

export default () => tag('div', {
  children: [
    tag('h1', 'Corodva App'),
    tag('button', {
      textContent: 'Push page',
      dataset: {
        action: 'push-page',
      },
    }),
  ],
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
