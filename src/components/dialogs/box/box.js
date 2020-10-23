import "./box.scss";
import $_box from './box.hbs';

import tag from 'html-tag-js';
import mustache from 'mustache';
import helpers from "../../../utils/helpers";

/**
 * Creates a popup box
 * @param {String} title title of the box 
 * @param {String} body  body of the box
 * @param {"top"|"bottom"|"center"} position  body of the box
 */
export default function Box(title, body, position = "top") {

  const id = helpers.uuid();
  const $box = tag.parse(mustache.render($_box, {
    id,
    title,
    body,
    position
  }));

  return {
    render() {
      document.body.append($box);

      actionStack.push({
        id,
        action: this.hide
      });
    },
    hide() {
      actionStack.remove(id);
      $box.get(":scope>.box").classList.add("hide");
      $box.get(":scope>.mask").classList.add("hide");
      setTimeout(() => {
        $box.remove();
      }, 300);
    },
    $mask: $box.get(":scope>.mask"),
    $body: $box.get(":scope>.box>.body")
  };

}