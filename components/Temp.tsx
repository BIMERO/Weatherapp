import React, { useState } from "react";
import Image from "next/image";
import { FaCircleDot } from "react-icons/fa6";
import { CelsiusToFahrenheit } from "@/utils/CelsiusToFahrenheit";
import { WeatherImage } from "@/utils/WeatherImage";
import { useAtom } from "jotai";
import { placeAtom } from "@/app/atom";

const Temp = ({ data }: any) => {
  const firstData = data?.list[0];
  const count = data?.city;
  const temp = firstData?.main.temp.toFixed();

  const [isCelsius, setIsCelsius] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(temp);

  const toFahrenheit = () => {
    setIsCelsius(false);
    setCurrentTemp(CelsiusToFahrenheit(temp));
  };

  const toCelsius = () => {
    setIsCelsius(true);
    setCurrentTemp(temp);
  };

  const [place, setplace] = useAtom(placeAtom);

  return (
    <section className="p-4 w-full md:w-fit md:p-8 bg-100 rounded-md text-lg">
      <div className="flex items-center gap-5 mb-6">
        <h1 className="text-5xl font-semibold">
          {currentTemp}
          {isCelsius ? "°C" : "°F"}
        </h1>
        <div className="flex items-center flex-col gap-3 text-3xl">
          <button className="flex items-start" onClick={toCelsius}>
            <FaCircleDot className="text-[8px]" />C
          </button>
          <button className="flex items-start" onClick={toFahrenheit}>
            <FaCircleDot className="text-[8px]" />F
          </button>
        </div>
      </div>
      <aside className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex items-center flex-col">
          <Image
            src={WeatherImage(firstData?.weather[0].icon)}
            alt="weather-icon"
            width={80}
            height={80}
          />

          <p className="text-lg">{firstData?.weather[0].main}</p>
        </div>
        <div>
          <p className="text-3xl font-medium capitalize"> {place} </p>
          <p className="text-xl">{count?.country}</p>
        </div>
      </aside>
    </section>
  );
};

export default Temp;
