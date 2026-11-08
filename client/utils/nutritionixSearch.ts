export interface NutritionixSearchFood {
  food_name: string;
  photo?: { thumb?: string | null };
  nix_item_id?: string;
  nf_calories?: number;
}

export interface NutritionixSearchResults {
  common: NutritionixSearchFood[];
  branded: NutritionixSearchFood[];
}

function hasFoodName(value: unknown): value is NutritionixSearchFood {
  return (
    !!value &&
    typeof value === 'object' &&
    'food_name' in value &&
    typeof value.food_name === 'string' &&
    value.food_name.length > 0
  );
}

export async function readNutritionixSearchResponse(
  response: Response
): Promise<NutritionixSearchResults> {
  if (!response.ok) {
    throw new Error(`Food search returned HTTP ${response.status}`);
  }

  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== 'object' ||
    !('common' in result) ||
    !Array.isArray(result.common) ||
    !('branded' in result) ||
    !Array.isArray(result.branded)
  ) {
    throw new Error('Food search returned an unexpected response');
  }

  return {
    common: result.common.filter(hasFoodName),
    branded: result.branded
      .filter(hasFoodName)
      .filter((food) => typeof food.nix_item_id === 'string' && food.nix_item_id.length > 0),
  };
}
