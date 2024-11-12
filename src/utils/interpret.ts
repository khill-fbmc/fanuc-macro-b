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

/**
 * Sugar method to search for valid gcode lines
 */
export function evaluate(text: string) {
  return interpret(text, "lines");
}

/**
 * Sugar method to search for a valid program.
 *
 * A valid program is any valid lines, wrapped with `%`
 * as the first and last lines. A program number is
 * required as well as the second line.
 */
export function validate(text: string) {
  return interpret(text, "program");
}
