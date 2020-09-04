/// <reference path="../.vscode/typings/cordova/cordova.d.ts"/>

interface Action {
  id: String;
  action(): void;
}

interface ActionStack {
  /**
   * Pushes a action to actionStack
   * @param action Pass action id and callback function that will be called on pop
   */
  push(action: Action);
  /**
   * Pops and calls the action
   */
  pop();
  /**
   * Removes any action from actionstack
   * @param id Id of the action to remove
   */
  remove(id: String);
  /**
   * Checks whether a action exists or not
   * @param id Id of the action to check
   */
  has(id: String);
  /**
   * lenght of the actionstack
   */
  length: Number;
}

interface PageOption {
  /**
   * ID of the page. This id will will also be the elm id i.e.
   * ```html
   * <div clas="page" id="<givenID>">
   * ```
   * If not passed will be generated automatically
   */
  id: String;
  /**
   * This indicated if the page is secondary page. If value is true then page will contain hide
   * method and a back icon.
   */
  secondary: boolean;
  /**
   * Called along with the page.hide is called.
   */
  onhide(): void;
}

declare var app: HTMLDivElement;
declare var actionStack: ActionStack;