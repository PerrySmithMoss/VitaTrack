import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readNutritionixSearchResponse } from '../utils/nutritionixSearch.ts';

test('rejects the Nutritionix unauthorized response before reading result lists', async () => {
  const response = Response.json(
    { message: 'unauthorized', id: 'example' },
    { status: 401 }
  );

  await assert.rejects(readNutritionixSearchResponse(response), /HTTP 401/);
});

test('rejects a successful response with missing result lists', async () => {
  await assert.rejects(
    readNutritionixSearchResponse(Response.json({ common: [] })),
    /unexpected response/
  );
});

test('preserves matches and distinguishes a successful empty search', async () => {
  const matches = { common: [{ food_name: 'banana' }], branded: [] };
  assert.deepEqual(
    await readNutritionixSearchResponse(Response.json(matches)),
    matches
  );

  const empty = { common: [], branded: [] };
  assert.deepEqual(
    await readNutritionixSearchResponse(Response.json(empty)),
    empty
  );
});
