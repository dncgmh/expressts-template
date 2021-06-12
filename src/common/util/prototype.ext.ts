export const toRound = (Number.prototype.toRound = function (this: number, digit: number): number {
  const frag = 10 ** digit;
  return Math.round(this * frag) / frag;
});

export const toFloor = (Number.prototype.toFloor = function (this: number, digit: number): number {
  const frag = 10 ** digit;
  return Math.floor(this * frag) / frag;
});

declare global {
  export interface Number {
    /**
     *
     * @description `round` number with fractionDigit provided
     * @param {number} digit
     */
    toRound(digit: number): number;
    /**
     *
     * @description `floor` number with fractionDigit provided
     * @param {number} digit
     */
    toFloor(digit: number): number;
  }
}
