import PageHandler from './pageHandler';

export default class CordovaPage extends HTMLElement {
  #connected = false;
  #on = {
    hide: [],
    show: [],
    connect: [],
    disconnect: [],
  };
  handler;

  constructor() {
    super();

    this.remove = this.remove.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.handler = new PageHandler(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-title') {
      this.settitle = newValue;
    }
  }

  connectedCallback() {
    this.classList.remove('hide');
    setTimeout(() => {
      this.classList.add('shown');
    }, 300);
    this.#on.connect.forEach((cb) => cb.call(this));
    if (!this.#connected) {
      this.#connected = true;
      this.#on.show.forEach((cb) => cb.call(this));
    }
  }

  disconnectedCallback() {
    this.#on.disconnect.forEach((cb) => cb.call(this));
  }

  /**
   * Adds event listener to the page
   * @param {'hide' | 'show'} event
   * @param {function(this: WCPage):void} cb
   */
  on(event, cb) {
    if (event in this.#on) {
      this.#on[event].push(cb);
    }
  }

  /**
   * Removes event listener from the page
   * @param {'hide' | 'show'} event
   * @param {function(this: WCPage):void} cb
   */
  off(event, cb) {
    if (event in this.#on) {
      this.#on[event] = this.#on[event].filter((fn) => fn !== cb);
    }
  }

  setTitle(title) {
    const { $title } = this;
    if (!$title) return;
    $title.innerText = title;
  }

  destroy() {
    this.classList.add('hide');
    setTimeout(() => {
      this.remove();
      this.handler.remove();
      this.#on.hide.forEach((cb) => cb.call(this));
      this.#connected = false;
    }, 150);
  }

  get $header() {
    return this.get('header');
  }

  get $title() {
    return this.$header?.get('.title');
  }

  get $lead() {
    return this.$header?.get('.lead');
  }

  get $tail() {
    return this.$header?.get('.tail');
  }

  get $body() {
    return this.get('.body');
  }

  get content() {
    const { $body } = this;
    return $body.content;
  }

  set content(value) {
    const { $body } = this;
    if ($body) $body.content = value;
  }
}
