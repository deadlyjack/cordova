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
  /**
   * Triggered when a new action is pushed to action stack.
   * @param action
   */
  onpush(action: Action): void;
  /**
   * Triggered when top of action stack is changed.
   * @param action
   */
  onpop(action: Action): void;
  /**
   * Triggered when any action is removed.
   * @param action
   */
  onremove(id: String): void;
  /**
   * Add a event listener to action stack
   * @param event
   * @param listener
   */
  on(
    event: 'pop' | 'push' | 'remove',
    listener: (action: Action) => void,
  ): void;

  /**
   * Removes a event listener to action stack
   * @param event
   * @param listener
   */
  off(
    event: 'pop' | 'push' | 'remove',
    listener: (action: Action) => void,
  ): void;
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
}

declare const app: HTMLDivElement;
declare const actionStack: ActionStack;
declare const ROOT: String;
declare const IS_ANDROID: Boolean;
declare const IS_ELECTRON: Boolean;
declare const PLATFORM: 'android' | 'electron' | 'browser';
