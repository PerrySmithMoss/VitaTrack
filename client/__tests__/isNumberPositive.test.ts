import { isNumberPositive } from '../utils/isNumberPositive';

describe('converts a floating point number to one decimal place', () => {
  it('takes a number as an argument, returns true if number is possitive, returns false if number is negative', () => {
    expect(isNumberPositive(3.333333)).toBe(true);
  });
});
