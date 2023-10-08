class Theme {
  #scheme;
  #$style;
  type = 'light';

  constructor(scheme, type) {
    this.#scheme = scheme;
    this.type = type;

    const $theme = document.head.get('style#theme');
    $theme?.remove();
    this.#$style = <style id='theme'></style>;
    this.updateTheme();
    document.head.appendChild(this.#$style);
  }

  get scheme() {
    return { ...this.#scheme };
  }

  set scheme(val) {
    this.#scheme = val;
    this.updateTheme();
  }

  updateTheme() {
    this.#$style.textContent = this.#toStyle();
  }

  get(color) {
    return this.#scheme[color];
  }

  #toStyle() {
    let theme = '';
    Object.keys(this.#scheme).forEach((color) => {
      const cssVar = color.replace(/[A-Z]/g, ($) => `-${$.toLowerCase()}`);
      theme += `--${cssVar}: ${this.#scheme[color]};`;
    });
    return `:root{${theme}}`;
  }
}

/** @type {Theme} */
let theme;

export default (colors, type) => {
  if (theme) {
    return theme;
  }

  theme = new Theme(colors, type);
  return theme;
};
