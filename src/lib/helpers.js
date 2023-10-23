export default {
  /**
   * Returns unique ID
   * @returns {string}
   */
  uuid() {
    return (new Date().getTime() + parseInt(Math.random() * 100000000000, 10)).toString(36);
  },
};
