import type { ILexingResult } from "chevrotain";

import { MacroLexer } from "../MacroLexer";

/**
 * Tokenize a block of text
 */
export function lex(inputText: string): ILexingResult {
  const lexer = new MacroLexer();
  return lexer.tokenize(inputText);
}
