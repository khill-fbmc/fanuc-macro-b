/* eslint-disable @typescript-eslint/no-empty-interface */
import "@vitest/expect";

import type { IToken, TokenType } from "chevrotain";

interface CustomMatchers<R = unknown> {
  toBeNearlyEqual: (received: number, epislon?: number) => R;
  toMatchToken: (received: IToken, tokType: TokenType) => R;
}

declare module "vitest" {
  /* @eslint-disable-line prettier/prettier */
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
