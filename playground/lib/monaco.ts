import type * as Monaco from "monaco-editor";

import { getMonacoUtils } from "../../src/index";
import { gcodeDarkTheme } from "../../src/monaco-dev/gcode.dark";
import { gcodeLanguage } from "../../src/monaco-dev/gcode.lang";
import { gcodeLightTheme } from "../../src/monaco-dev/gcode.light";

export function registerMonacoResources(monaco: typeof Monaco) {
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  const utils = getMonacoUtils(monaco);

  utils.registerCustomLanguage("gcode", gcodeLanguage);
  utils.registerCustomTheme("gcode-dark", gcodeDarkTheme);
  utils.registerCustomTheme("gcode-light", gcodeLightTheme);
}
