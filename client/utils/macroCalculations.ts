export function calculatePercentage(percentage: number, amount: number) {
  if (Number.isNaN(amount)) {
    return 0;
  } else {
    return Math.round((percentage * amount) / 100);
  }
}

export function calculateGramsFromMacronutrient(
  grams: number,
  macronutrient: 'fat' | 'carbohydrate' | 'protein'
) {
  if (macronutrient === 'carbohydrate' || macronutrient === 'protein') {
    return grams / 4;
  } else {
    return grams / 9;
  }
}
