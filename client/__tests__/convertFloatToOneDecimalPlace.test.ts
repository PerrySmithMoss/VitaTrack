import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { convertFloatToOneDecimalPlace } from '../utils/convertFloatToOneDecimalPlace.ts';

describe('converts a floating point number to one decimal place', () => {
  it('takes a number as an argument, if the number has 2 or more decimal points it will convert it to one decimal point', () => {
    assert.equal(convertFloatToOneDecimalPlace(3.333333, true), 3.3);
  });

  it('shows or hides zero according to the display option', () => {
    assert.equal(convertFloatToOneDecimalPlace(0, true), 0);
    assert.equal(convertFloatToOneDecimalPlace(0, false), '');
  });
});
