import type { IToken } from "chevrotain";

import { interpret } from "./utils/interpret";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function round(num: number, decimals = 5): number {
  return num;
  // const factorOfTen = Math.pow(10, decimals);
  // return Math.round(num * factorOfTen) / factorOfTen;
}

export function degreeToRadian(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function radianToDegree(radians: number) {
  return (180 / Math.PI) * radians;
}

export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}

/**
 * Return the image property from a possible token
 */
export function getImage(token: IToken | IToken[]) {
  return unbox(token).image;
}

/**
 * Sugar method to search for valid gcode lines
 */
export function evaluate(text: string) {
  return interpret(text, "lines");
}

/**
 * Sugar method to search for a valid program.
 *
 * A valid program is any valid lines, wrapped with `%`
 * as the first and last lines. A program number is
 * required as well as the second line.
 */
export function validate(text: string) {
  return interpret(text, "program");
}
