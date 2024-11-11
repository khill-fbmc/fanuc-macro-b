import type { ParsingResultWithLexingErrors } from "../../types";
import { parser } from "../MacroParser";
import { lex } from "./lex";

/**
 * Parse a given block of text
 */
export function parse(text: string): ParsingResultWithLexingErrors {
  const lexResult = lex(text);

  parser.input = lexResult.tokens;

  return {
    parser,
    lexResult,
    lexErrors: lexResult.errors,
  };
}
