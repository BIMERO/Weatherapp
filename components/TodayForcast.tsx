import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import { MdOutlineVisibility } from "react-icons/md";
import { FaThermometerHalf } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { WindSpeedConvert } from "@/utils/WindSpeedConvert";

const TodayForcast = ({ data }: any) => {
  const firstData = data?.list[0];

  const [isWindSpeed, setIsWindSpeed] = useState(false);

  const toggleWindSpeed = () => {
    setIsWindSpeed(!isWindSpeed);
  };

  return (
    <section className="mt-3">
      <h2 className="capitalize text-2xl font-semibold mb-5">
        <p> {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")} </p>
        <p> {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")} </p>
      </h2>
      <ul className="p-4 md:p-8 bg-100 rounded-md md:text-lg w-fit leading-[50px]">
        <li className="flex items-center gap-3 font-semibold">
          <WiHumidity className="text-base md:text-4xl" />
          Humidity: {firstData?.main.humidity}%
        </li>
        <li className="flex items-center gap-3 font-semibold capitalize">
          <TiWeatherCloudy className="text-base md:text-4xl" />
          Weather Desc: {firstData?.weather[0].description}
        </li>
        <li className="flex items-center gap-3 font-semibold">
          <MdOutlineVisibility className="text-base md:text-4xl" />
          Visibility: {firstData?.visibility}
        </li>
        <li className="flex items-center gap-3 font-semibold flex-wrap">
          <WiStrongWind className="text-base md:text-4xl" />
          Wind Speed:
          <p>{firstData?.wind.speed}m/s</p>
          <span
            className="flex items-center flex-col"
            onClick={toggleWindSpeed}
          >
            <span className="text-xs">convert</span>
            <RiArrowLeftRightLine />
          </span>
          {isWindSpeed && <p>{WindSpeedConvert(firstData?.wind.speed)}</p>}
        </li>
        <li className="flex items-center gap-3 font-semibold">
          <FaThermometerHalf className="text-base md:text-4xl" />
          Pressure: {firstData?.main.pressure}hPa
        </li>
      </ul>
    </section>
  );
};

export default TodayForcast;
