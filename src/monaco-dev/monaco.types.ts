import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

import type { GCodeDarkTheme } from "./gcode.dark";
import type { GCodeLightTheme } from "./gcode.light";

export { Monaco };

export type GCodeTheme = GCodeLightTheme | GCodeDarkTheme;

export type MonacoThemeDef = Monaco.editor.IStandaloneThemeData;

export type MonacoLangDef =
  | Monaco.languages.IMonarchLanguage
  | Monaco.Thenable<Monaco.languages.IMonarchLanguage>;

export type MonarchTokenizerRule = [match: RegExp, token: string];

export type MonarchLanguageBracket = {
  /**
   * open bracket
   */
  open: string;
  /**
   * closing bracket
   */
  close: string;
  /**
   * token class
   */
  token: string;
};
