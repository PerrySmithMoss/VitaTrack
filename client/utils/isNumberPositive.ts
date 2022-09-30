export function isNumberPositive(num: number) {
  if (isNaN(Number(num)) || Number(num) < 0) {
    return false;
  } else {
    return true;
  }
}
