import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ProgramCstNode extends CstNode {
  name: "Program";
  children: ProgramCstChildren;
}

export type ProgramCstChildren = {
  startOfFile: StartOfFileCstNode[];
  Heading: HeadingCstNode[];
  Line?: LineCstNode[];
  Percent: IToken[];
};

export interface LineCstNode extends CstNode {
  name: "Line";
  children: LineCstChildren;
}

export type LineCstChildren = {
  manyNcTokens: ManyNcTokensCstNode[];
  Newline: IToken[];
};

export interface HeadingCstNode extends CstNode {
  name: "Heading";
  children: HeadingCstChildren;
}

export type HeadingCstChildren = {
  ProgramNumber: IToken[];
  Comment?: IToken[];
  Newline: IToken[];
};

export interface VariableAssignmentCstNode extends CstNode {
  name: "variableAssignment";
  children: VariableAssignmentCstChildren;
}

export type VariableAssignmentCstChildren = {
  macroVariable: MacroVariableCstNode[];
  Equals: IToken[];
  NumberLiteral: IToken[];
};

export interface StartOfFileCstNode extends CstNode {
  name: "startOfFile";
  children: StartOfFileCstChildren;
}

export type StartOfFileCstChildren = {
  Percent: IToken[];
  Newline: IToken[];
};

export interface MacroVariableCstNode extends CstNode {
  name: "macroVariable";
  children: MacroVariableCstChildren;
}

export type MacroVariableCstChildren = {
  Var: IToken[];
  Integer: IToken[];
};

export interface ValueAddressCstNode extends CstNode {
  name: "valueAddress";
  children: ValueAddressCstChildren;
}

export type ValueAddressCstChildren = {
  Address: IToken[];
  NumericValue: IToken[];
};

export interface VariableAddressCstNode extends CstNode {
  name: "variableAddress";
  children: VariableAddressCstChildren;
}

export type VariableAddressCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  macroVariable: MacroVariableCstNode[];
};

export interface NcTokenCstNode extends CstNode {
  name: "ncToken";
  children: NcTokenCstChildren;
}

export type NcTokenCstChildren = {
  Comment?: IToken[];
  LineNumber?: IToken[];
  valueAddress?: ValueAddressCstNode[];
  macroVariable?: MacroVariableCstNode[];
  variableAddress?: VariableAddressCstNode[];
};

export interface ManyNcTokensCstNode extends CstNode {
  name: "manyNcTokens";
  children: ManyNcTokensCstChildren;
}

export type ManyNcTokensCstChildren = {
  ncToken?: NcTokenCstNode[];
};

export interface ExpressionCstNode extends CstNode {
  name: "expression";
  children: ExpressionCstChildren;
}

export type ExpressionCstChildren = {
  additionExpression: AdditionExpressionCstNode[];
};

export interface AdditionExpressionCstNode extends CstNode {
  name: "additionExpression";
  children: AdditionExpressionCstChildren;
}

export type AdditionExpressionCstChildren = {
  lhs: MultiplicationExpressionCstNode[];
  AdditionOperator?: IToken[];
  rhs?: MultiplicationExpressionCstNode[];
};

export interface MultiplicationExpressionCstNode extends CstNode {
  name: "multiplicationExpression";
  children: MultiplicationExpressionCstChildren;
}

export type MultiplicationExpressionCstChildren = {
  lhs: AtomicExpressionCstNode[];
  MultiplicationOperator?: IToken[];
  rhs?: AtomicExpressionCstNode[];
};

export interface AtomicExpressionCstNode extends CstNode {
  name: "atomicExpression";
  children: AtomicExpressionCstChildren;
}

export type AtomicExpressionCstChildren = {
  bracketExpression?: BracketExpressionCstNode[];
  NumericValue?: IToken[];
  powerFunction?: PowerFunctionCstNode[];
};

export interface BracketExpressionCstNode extends CstNode {
  name: "bracketExpression";
  children: BracketExpressionCstChildren;
}

export type BracketExpressionCstChildren = {
  OpenBracket: IToken[];
  expression: ExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface PowerFunctionCstNode extends CstNode {
  name: "powerFunction";
  children: PowerFunctionCstChildren;
}

export type PowerFunctionCstChildren = {
  PowerFunc: IToken[];
  OpenParen: IToken[];
  base: ExpressionCstNode[];
  Comma: IToken[];
  exponent: ExpressionCstNode[];
  CloseParen: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  Program(children: ProgramCstChildren, param?: IN): OUT;
  Line(children: LineCstChildren, param?: IN): OUT;
  Heading(children: HeadingCstChildren, param?: IN): OUT;
  variableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
  startOfFile(children: StartOfFileCstChildren, param?: IN): OUT;
  macroVariable(children: MacroVariableCstChildren, param?: IN): OUT;
  valueAddress(children: ValueAddressCstChildren, param?: IN): OUT;
  variableAddress(children: VariableAddressCstChildren, param?: IN): OUT;
  ncToken(children: NcTokenCstChildren, param?: IN): OUT;
  manyNcTokens(children: ManyNcTokensCstChildren, param?: IN): OUT;
  expression(children: ExpressionCstChildren, param?: IN): OUT;
  additionExpression(children: AdditionExpressionCstChildren, param?: IN): OUT;
  multiplicationExpression(
    children: MultiplicationExpressionCstChildren,
    param?: IN
  ): OUT;
  atomicExpression(children: AtomicExpressionCstChildren, param?: IN): OUT;
  bracketExpression(children: BracketExpressionCstChildren, param?: IN): OUT;
  powerFunction(children: PowerFunctionCstChildren, param?: IN): OUT;
}