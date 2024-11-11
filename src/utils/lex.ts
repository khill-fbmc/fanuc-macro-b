import type { ILexingResult } from "chevrotain";

import { MacroLexer } from "../MacroLexer";

/**
 * Tokenize a block of text
 */
export function lex(inputText: string): ILexingResult {
  return MacroLexer.tokenize(inputText);
}
