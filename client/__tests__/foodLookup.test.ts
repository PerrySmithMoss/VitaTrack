import assert from 'node:assert/strict';
import { test } from 'node:test';
import { portionNutrients } from '../utils/foodLookup.ts';

test('scales all diary nutrients by portion weight and fractional quantity', () => {
  const portion = { name: '1 banana', grams: 126 };
  const nutrients = portionNutrients({
    food: {
      id: 2709224,
      name: 'Banana, raw',
      portions: [portion],
      nutrientsPer100g: { calories: 89, protein: 1, fat: 0.5, carbohydrate: 20, sugar: 10, sodium: 2 },
    },
    portion,
    quantity: '0.5',
  });
  assert.deepEqual(nutrients, {
    calories: 56,
    protein: 0.63,
    fat: 0.315,
    carbohydrate: 12.6,
    sugar: 6.3,
    sodium: 1.26,
  });
});
