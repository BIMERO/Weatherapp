export function CelsiusToFahrenheit(FahrenheitTemp: number) {
  const CelsiusTemp = (FahrenheitTemp * 9) / 5 + 32;
  return Math.floor(CelsiusTemp);
}
