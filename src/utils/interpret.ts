import { interpreter } from "../MacroInterpreter";
import { parse } from "./parse";

/**
 * Run the full interpreter and generate CST
 */
export function interpret(text: string, rule: string) {
  const { parser, lexResult } = parse(text);

  const cst = parser[rule]();

  const result = interpreter.visit(cst);

  return {
    result,
    parser,
    lexResult,
    interpreter,
    parseErrors: parser.errors,
    macros: interpreter.getMacros(),
  };
}
