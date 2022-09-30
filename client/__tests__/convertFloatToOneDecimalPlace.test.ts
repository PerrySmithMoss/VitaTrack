import { convertFloatToOneDecimalPlace } from '../utils/convertFloatToOneDecimalPlace';

describe('converts a floating point number to one decimal place', () => {
  it('takes a number as an argument, if the number has 2 or more decimal points it will convert it to one decimal point', () => {
    expect(convertFloatToOneDecimalPlace(3.333333)).toBe(3.3);
  });
});
