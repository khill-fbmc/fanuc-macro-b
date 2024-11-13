import type { BaseParser } from "chevrotain";

import { gcodeDarkTheme } from "./gcode.dark";
import { gcodeLanguage } from "./gcode.lang";
import { gcodeLightTheme } from "./gcode.light";
import type {
  Monaco,
  MonacoLangDef,
  MonacoThemeDef,
  MonarchTokenizerRule,
} from "./monaco.types";

/**
 * Register a custom theme with a Monaco Editor instance
 */
export function registerCustomTheme<T extends typeof Monaco>(
  monaco: T,
  themeName: string,
  themeData: MonacoThemeDef
): T {
  monaco.editor.defineTheme(themeName, themeData);
  return monaco;
}

/**
 * Register a custom language with a Monaco Editor instance
 */
export function registerCustomLanguage<T extends typeof Monaco>(
  monaco: T,
  languageId: string,
  languageDef: MonacoLangDef
): T {
  monaco.languages.register({ id: languageId });
  monaco.languages.setMonarchTokensProvider(languageId, languageDef);
  return monaco;
}

/**
 * Register the custom gcode language and themes
 */
export function registerMonacoResources(monaco: typeof Monaco) {
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  registerCustomLanguage(monaco, "gcode", gcodeLanguage);
  registerCustomTheme(monaco, "gcode-dark", gcodeDarkTheme);
  registerCustomTheme(monaco, "gcode-light", gcodeLightTheme);
}

/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @todo look into this, and actually generate it
 */
export function generateMonarchLanguage<T extends BaseParser>(
  parser: T,
  brackets: Monaco.languages.IMonarchLanguageBracket[],
  rules: MonarchTokenizerRule[]
): Monaco.languages.IMonarchLanguage {
  // console.log(parser);

  return {
    brackets,
    tokenizer: {
      root: rules,
    },
  };
}
