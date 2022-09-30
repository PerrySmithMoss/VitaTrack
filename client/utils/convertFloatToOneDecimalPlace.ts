export function convertFloatToOneDecimalPlace(number: number) {
  const isDecimal = number - Math.floor(number) !== 0;

  if (isDecimal) {
    return parseFloat((Math.round(number * 100) / 100).toFixed(1));
  } else {
    return number;
  }
}
