export type Nutrients = {
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  sugar: number;
  sodium: number;
};

export type FoodMatch = { id: number; name: string };
export type FoodPortion = { name: string; grams: number };
export type FoodDetails = FoodMatch & {
  nutrientsPer100g: Nutrients;
  portions: FoodPortion[];
};

export type BasketFood = {
  food: FoodDetails;
  portion: FoodPortion;
  quantity: string;
};

export function portionNutrients({ food, portion, quantity }: BasketFood): Nutrients {
  const scale = Number(quantity) * portion.grams / 100;
  const nutrients = food.nutrientsPer100g;
  return {
    calories: Math.round(nutrients.calories * scale),
    protein: nutrients.protein * scale,
    fat: nutrients.fat * scale,
    carbohydrate: nutrients.carbohydrate * scale,
    sugar: nutrients.sugar * scale,
    sodium: nutrients.sodium * scale,
  };
}

export async function lookupFood<T>(
  action: 'search' | 'details',
  value: string | number,
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch('/api/food-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, value }),
    signal,
  });
  if (!response.ok) throw new Error('Food lookup is unavailable');
  return response.json();
}
