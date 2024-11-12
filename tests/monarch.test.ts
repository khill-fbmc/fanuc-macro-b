import { describe, expect, it } from "vitest";

import { gcodeLanguage } from "../src/monaco-dev/gcode.lang";

describe.skip("Monarch definition generator", () => {
  it("creates a proper object", () => {
    const { defaultToken, tokenPostfix, brackets } = gcodeLanguage;

    expect(defaultToken).toBeTypeOf("string");
    expect(tokenPostfix).toBeTypeOf("string");
    expect(Array.isArray(brackets)).toBeTruthy();
    // expect(typeKeywords).toBeArray();
  });
});
