// T = {string | number}
export default class Comparator<T extends string | number> {
  compare: (a: T, b: T) => number;

  /**
   * @param {Function} compareFunction 비교 함수
   */
  constructor(compareFunction?: (a: T, b: T) => number) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {number} 값이 같으면 0, 첫 번째 인자가 작으면 음수, 첫 번째 인자가 크면 양수
   */
  static defaultCompareFunction(
    a: number | string,
    b: number | string
  ): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {boolean} 값이 같으면 true, 아니면 false
   */
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {boolean} a가 b보다 작으면 참
   */
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {boolean} a가 b보다 크면 참
   */
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {boolean} a가 b보다 작거나 같으면 참
   */
  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   *
   * @param {number | string} a 첫 번째 값
   * @param {number | string} b 두 번째 값
   * @returns {boolean} a가 b보다 크거나 같으면 참
   */
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * 비교 순서 변경
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
