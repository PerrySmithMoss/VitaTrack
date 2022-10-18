export function convertFloatToOneDecimalPlacev2(number: number) {
  const isDecimal = number - Math.floor(number) !== 0;

  if (isDecimal) {
    return parseFloat((Math.round(number * 100) / 100).toFixed(1));
  } else {
    return number;
  }
}

export function convertFloatToOneDecimalPlace(
  number: number,
  showZero: boolean
) {
  const isDecimal = number - Math.floor(number) !== 0;

  if (isDecimal) {
    return parseFloat((Math.round(number * 100) / 100).toFixed(1));
  } else if (number === 0) {
    if (!showZero) {
      return '';
    } else {
      return number;
    }
  } else {
    return number;
  }
}
