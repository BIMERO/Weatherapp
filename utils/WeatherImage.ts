// export function transformIcon = (code: any) =>
//   `https://openweathermap.org/img/wn/${code}@2x.png`;

export function WeatherImage(code: any) {
  const icon = `https://openweathermap.org/img/wn/${code}@2x.png`;

  return icon;
}
