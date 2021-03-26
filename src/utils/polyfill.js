if (!HTMLElement.prototype.getParent) {
  HTMLElement.prototype.getParent = function (queryString) {
    const $$ = [...document.querySelectorAll(queryString)];
    for (let $ of $$)
      if ($.contains(this)) return $;
    return null;
  };
}

Object.defineProperty(String.prototype, 'hashCode', {
  value: function () {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
      const chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) + (hash < 0 ? 'N' : '');
  }
});

Object.defineProperty(String.prototype, 'subtract', {
  value: function (str) {
    return this.replace(new RegExp("^" + str), '');
  }
});

Object.defineProperty(String.prototype, 'capitalize', {
  value: function (index) {
    if (typeof index === "number" && index >= 0) {
      const strs = [this.slice(0, index), this.slice(index, index + 1), this.slice(index + 1)];
      return strs[0] + (strs[1] ? strs[1].toUpperCase() : '') + strs[2];
    } else {
      let strs = this.split(' ');
      strs = strs.map(str => {
        if (str.length > 0) return (str[0].toUpperCase() + str.slice(1));
        return '';
      });
      return strs.join(' ');
    }
  }
});

Object.defineProperty(String.prototype, 'toNumber', {
  value: function () {
    return +this.replace(/[^0-9.-]+/g, "");
  }
});

Object.defineProperty(String.prototype, 'escapeRegexp', {
  value: function () {
    return this.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
});

Object.defineProperty(String.prototype, 'toOnlyAlphabets', {
  value: function () {
    return this.replace(/[^a-z]/ig, "");
  }
});