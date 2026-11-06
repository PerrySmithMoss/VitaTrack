import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isNumberPositive } from '../utils/isNumberPositive.ts';

describe('converts a floating point number to one decimal place', () => {
  it('takes a number as an argument, returns true if number is possitive, returns false if number is negative', () => {
    assert.equal(isNumberPositive(3.333333), true);
  });
});
