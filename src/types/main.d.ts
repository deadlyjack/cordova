/// <reference path="../../.vscode/typings/cordova/cordova.d.ts"/>
/// <reference path="../../.vscode/typings/cordova/plugins/StatusBar.d.ts"/>

interface PageOption {
  /**
   * ID of the page. This id will will also be the elm id i.e.
   * ```html
   * <div class="page" id="<givenID>">
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
declare const ROOT: String;
declare const IS_ANDROID: Boolean;
declare const IS_ELECTRON: Boolean;
declare const PLATFORM: 'android' | 'electron' | 'browser';
