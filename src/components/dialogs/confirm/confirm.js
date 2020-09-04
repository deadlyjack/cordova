import Box from "../box/box";

export default function confirm(title, message) {
  return new Promise(resolve => {

    const box = Box(title, message);
    box.render();

    box.$body.onclick = clickhandler;

    /**
     * 
     * @param {MouseEvent} e 
     */
    function clickhandler(e) {
      const $target = e.target;
      if (!($target instanceof HTMLElement)) return;
      const action = $target.getAttribute("target");
      if (!action) return;

      box.hide();
      if (action === "ok") resolve();
    }

  });
}