import tag from 'html-tag-js';

class Theme {
  #primaryColor;
  #primaryTextColor;
  #secondaryColor;
  #secondaryTextColor;
  #type;
  #$style;

  constructor(colors = {}) {
    const {
      primaryColor = '#ffffff',
      primaryTextColor = '#292749',
      secondaryColor = '#3399ff',
      secondaryTextColor = '#ffffff',
      type = 'light',
    } = colors;

    this.#primaryColor = primaryColor;
    this.#primaryTextColor = primaryTextColor;
    this.#secondaryColor = secondaryColor;
    this.#secondaryTextColor = secondaryTextColor;
    this.#type = type;

    const $theme = tag.get('style#theme');
    $theme?.remove();
    this.#$style = <style id='theme'></style>;
    this.updateTheme();
    document.head.appendChild(this.#$style);
  }

  updateTheme() {
    this.#$style.textContent = this.#toStyle();
  }

  get primaryColor() {
    return this.#primaryColor;
  }

  set primaryColor(val) {
    this.#primaryColor = val;
    this.updateTheme();
  }

  get primaryTextColor() {
    return this.#primaryTextColor;
  }

  set primaryTextColor(val) {
    this.#primaryTextColor = val;
    this.updateTheme();
  }

  get secondaryColor() {
    return this.#secondaryColor;
  }

  set secondaryColor(val) {
    this.#secondaryColor = val;
    this.updateTheme();
  }

  get secondaryTextColor() {
    return this.#secondaryTextColor;
  }

  set secondaryTextColor(val) {
    this.#secondaryTextColor = val;
    this.updateTheme();
  }

  get type() {
    return this.#type;
  }

  set type(val) {
    this.#type = val;
  }

  #toStyle() {
    return `:root{
  --primary-color: ${this.#primaryColor};
  --primary-text-color: ${this.#primaryTextColor};
  --secondary-color: ${this.#secondaryColor};
  --secondary-text-color: ${this.#secondaryTextColor};
}`;
  }
}

/** @type {Theme} */
let theme;

export default (colors) => {
  if (theme) {
    return theme;
  }

  theme = new Theme(colors);
  return theme;
};
