import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { WeatherImage } from "@/utils/WeatherImage";

const Daily = ({ data }: any) => {
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: any) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <section className="text-white p-8 h-fit bg-100 rounded-md">
      <h2 className="text-2xl font-semibold pb-3 mb-5 border-b-2 border-white">
        Daily Forecast
      </h2>
      <div className="flex items-center gap-8 overflow-x-auto pb-6">
        {firstDataForEachDate.map((d, i) => (
          <div className="flex flex-col gap-4 items-center" key={i}>
            <h4 className="text-lg font-semibold whitespace-nowrap">
              {format(parseISO(d.dt_txt ?? ""), "EEEE")}
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

export default Daily;
