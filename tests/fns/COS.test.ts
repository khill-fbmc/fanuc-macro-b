import { describe, expect, it } from "vitest";

import { interpret } from "../../src";

const code = `
#1=COS[5]
#2=COS[15]
#3=COS[30]
#4=COS[45]
#5=COS[60]
#6=COS[90]`;

describe("Function: COS[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate COS[5]", () => {
    expect(result.get(1)).toBeNearlyEqual(1);
  });

  it("can calculate COS[15]", () => {
    expect(result.get(2)).toBeNearlyEqual(0.96593);
  });

  it("can calculate COS[30]", () => {
    expect(result.get(3)).toBeNearlyEqual(0.86603);
  });

  it("can calculate COS[45]", () => {
    expect(result.get(4)).toBeNearlyEqual(0.70711);
  });

  it("can calculate COS[60]", () => {
    expect(result.get(5)).toBeNearlyEqual(0.5);
  });

  it("can calculate COS[90]", () => {
    expect(result.get(6)).toBeNearlyEqual(0, 1e-12);
  });
});
