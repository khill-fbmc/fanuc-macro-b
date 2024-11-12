import { Lexer } from "chevrotain";

import { tokenSet } from "./tokens/token-set";

const MacroLexer = new Lexer(tokenSet);

export { MacroLexer };
