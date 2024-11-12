import { describe, expect, it } from "vitest";

import { interpret } from "../../src";

const code = `
#1=TAN[5]
#2=TAN[15]
#3=TAN[30]
#4=TAN[45]
#5=TAN[60]
#6=TAN[135]`;

describe("Function: TAN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate TAN[5]", () => {
    expect(result.get(1)).toBeNearlyEqual(0.08749);
  });

  it("can calculate TAN[15]", () => {
    expect(result.get(2)).toBeNearlyEqual(0.26795);
  });

  it("can calculate TAN[30]", () => {
    expect(result.get(3)).toBeNearlyEqual(0.57735);
  });

  it("can calculate TAN[45]", () => {
    expect(result.get(4)).toBeNearlyEqual(1);
  });

  it("can calculate TAN[60]", () => {
    expect(result.get(5)).toBeNearlyEqual(1.73205);
  });

  it("can calculate TAN[135]", () => {
    expect(result.get(6)).toBeNearlyEqual(-1);
  });
});
