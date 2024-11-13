import type { ILexingError, ILexingResult } from "chevrotain";

import type { MacroParser } from "./MacroParser";

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
