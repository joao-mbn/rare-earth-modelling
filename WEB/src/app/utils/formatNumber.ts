export function formatNumber(number: number): number {

  if (parseFloat(number.toFixed(2)) <= 0 || number >= 100) {
    return parseFloat(number.toExponential(2).replace(/e\+?/, ' x 10^'));
  } else {
    return parseFloat(number.toPrecision(2));
  }

}
