export function WindSpeedConvert(windspeed: number) {
  const speedmph = windspeed * 3.6;

  return `${speedmph.toFixed(0)}km/h`;
}
