import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { WeatherImage } from "@/utils/WeatherImage";

const Hourly = ({ data }: any) => {
  return (
    <section className="text-white p-8 h-fit bg-100 rounded-md mb-10">
      <h2 className="text-2xl font-semibold pb-3 mb-5 border-b-2 border-white">
        Hourly Forecast
      </h2>
      <div className="flex items-center gap-8 overflow-x-auto pb-6">
        {data?.list.map((d: any, i: any) => (
          <div className="flex flex-col gap-4 items-center" key={i}>
            <h4 className="text-lg font-semibold whitespace-nowrap">
              {format(parseISO(d.dt_txt ?? ""), "h:mm a")}
            </h4>

            <Image
              src={WeatherImage(d.weather[0].icon)}
              alt="weather-icon"
              width={80}
              height={80}
            />

            <p>{d.main.temp.toFixed()}°C</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hourly;
