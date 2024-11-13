import { MacroLexer } from "../MacroLexer";
import { MacroParser } from "../MacroParser";

/**
 * Parse a given block of text
 */
export function parse(text: string) {
  const parser = new MacroParser();
  const lexer = new MacroLexer();

  lexer.tokenize(text);

  parser.setInput(lexer.tokens);

  return { parser, lexer };
}
