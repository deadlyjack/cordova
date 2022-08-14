import tag from 'html-tag-js';

export default class PageHandler {
  $el;
  $replacement;

  /**
   *
   * @param {HTMLElement} $el
   */
  constructor($el) {
    this.$el = $el;

    this.onhide = this.#onhide.bind(this);
    this.onshow = this.#onshow.bind(this);

    this.$replacement = tag('span', { className: 'page-replacement' });
    this.$replacement.handler = this;

    this.$el.on('hide', this.#onhide);
    this.$el.on('show', this.#onshow);
  }

  /**
   * Replace current element with a replacement element
   */
  replaceEl() {
    this.$el.off('hide', this.#onhide);
    if (!this.$el.isConnected || this.$replacement.isConnected) return;
    this.$el.parentElement.replaceChild(this.$replacement, this.$el);
    this.$el.classList.add('no-transition');
  }

  /**
   * Restore current element from a replacement element
   */
  restoreEl() {
    if (this.$el.isConnected || !this.$replacement.isConnected) return;
    this.$el.off('hide', this.#onhide);
    this.$replacement.parentElement.replaceChild(this.$el, this.$replacement);
    this.$el.on('hide', this.#onhide);
  }

  #onhide() {
    this.$el.off('hide', this.#onhide);
    handlePagesForSmoothExprienceBack();
  }

  #onshow() {
    this.$el.off('show', this.#onshow);
    handlePagesForSmoothExprience();
  }

  remove() {
    this.$replacement.remove();
  }
}

/**
 * Remove invisible pages from DOM and add them to the stack
 */
function handlePagesForSmoothExprience() {
  const $pages = [...tag.getAll('cordova-page')];
  $pages.slice(0, -1).forEach(($page) => {
    $page.handler.replaceEl();
  });
}

function handlePagesForSmoothExprienceBack() {
  [
    ...tag.getAll('.page-replacement'),
  ].pop()?.handler.restoreEl();
}
