import { MacroInterpreter } from "../lib/FanucMacroB";

const interpreter = new MacroInterpreter();

export function useMacroInterpreter() {
  return interpreter;
}
