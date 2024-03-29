/**
 * @see https://github.com/maninak/ts-xor
 */

/**
 * Get the keys of T without any keys of U.
 */
type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never
}

/**
 * Restrict using either exclusively the keys of T or exclusively the keys of U.
 *
 * No unique keys of T can be used simultaneously with any unique keys of U.
 *
 * Example:
 * `const myVar: XOR<T, U>`
 *
 * More: https://github.com/maninak/ts-xor/tree/master#description
 */
export type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U
