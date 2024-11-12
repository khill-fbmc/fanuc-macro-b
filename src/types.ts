import type { ILexingError, ILexingResult } from "chevrotain";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

import type { MacroParser } from "./MacroParser";

export { Monaco };

export type StandaloneEditor = Monaco.editor.IStandaloneCodeEditor;

export interface ParsingResultWithLexingErrors extends IParsingResult {
  lexErrors: ILexingError[];
}

export interface IParsingResult {
  parser: MacroParser;
  lexResult: ILexingResult;
}

export interface VariableRegister {
  register: number;
  value: number;
  setValue: (value: number) => this;
}

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
