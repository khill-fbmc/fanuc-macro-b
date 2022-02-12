import {
  AdditionOperator,
  Address,
  BooleanOperator,
  Brackets,
  BuiltinFunctions,
  CloseBracket,
  CloseParen,
  Comma,
  Comment,
  ControlFlowKeyword,
  Decimal,
  Divide,
  Do,
  Equals,
  EqualTo,
  GotoLine,
  GreaterThan,
  GreaterThanOrEq,
  If,
  Integer,
  LessThan,
  LessThanOrEq,
  // LineNumber,
  Minus,
  MultiplicationOperator,
  Newline,
  NotEqualTo,
  NumericValue,
  OpenBracket,
  OpenParen,
  Percent,
  Plus,
  Product,
  ProgramNumber,
  Then,
  Var,
  While,
  WhiteSpace
} from ".";

/**
 * The order of tokens is important because token
 *  matches are applied sequentially
 */
export const allTokens = [
  Newline,
  WhiteSpace,
  // Gcode,
  // Mcode,
  ProgramNumber,
  // LineNumber,
  EqualTo,
  NotEqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  If,
  Do,
  Then,
  While,
  GotoLine,
  BuiltinFunctions,
  Comment,
  Var,
  Equals,
  Comma,
  Divide,
  Product,
  Minus,
  Plus,
  Percent,
  Address,
  Decimal,
  Integer,
  OpenParen,
  CloseParen,
  OpenBracket,
  CloseBracket,

  /**
   * Categories
   */
  ControlFlowKeyword,
  Brackets,
  NumericValue,
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
