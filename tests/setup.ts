import type { IToken, TokenType } from "chevrotain";
import { tokenMatcher } from "chevrotain";
import { expect } from "vitest";

const PRECISION = process.env.NEARLY_EQUAL_PRECISION;
export const DEFAULT_NEARLY_EQUAL_TOLERANCE = PRECISION
  ? 1 / Number(PRECISION)
  : 1e-7;

function toMatchToken(received: IToken, tokType: TokenType) {
  const pass = tokenMatcher(received, tokType);

  return {
    message: () => `expected ${received.tokenType.name} to be ${tokType.name}`,
    pass,
  };
}

function toBeNearlyEqual(
  received: number,
  expected: number,
  epsilon: number = DEFAULT_NEARLY_EQUAL_TOLERANCE
) {
  const absA = Math.abs(received);
  const absB = Math.abs(expected);
  const diff = Math.abs(received - expected);

  if (received === expected) {
    return {
      pass: true,
      message: () =>
        `expected ${received} not to be nearly equal to ${expected}`,
    };
  } else if (
    received === 0 ||
    expected === 0 ||
    absA + absB < Number.MIN_VALUE
  ) {
    // a or b is zero or both are extremely close to it
    // relative error is less meaningful here
    const pass = diff < epsilon;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be nearly equal to ${expected}`
          : `expected ${received} to be nearly equal to ${expected} (within epsilon * Number.MIN_VALUE)`,
    };
  } else {
    // Use relative error
    const pass = diff / Math.min(absA + absB, Number.MAX_VALUE) < epsilon;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be nearly equal to ${expected}`
          : `expected ${received} to be nearly equal to ${expected} (within epsilon)`,
    };
  }
}

expect.extend({ toMatchToken, toBeNearlyEqual });
