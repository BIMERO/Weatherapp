"use client";
import { useEffect, useState } from "react";
import Hourly from "@/components/Hourly/Hourly";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodayForcast from "@/components/TodayForcast";
import Temp from "@/components/Temp";
import Daily from "@/components/Daily/Daily";
import { useAtom } from "jotai";
import { placeAtom } from "./atom";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const [place, setplace] = useAtom(placeAtom);

  const { isPending, error, data, refetch } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=a26d6e4f3d89b360961d031198892418&units=metric`
      );

      return data;
    },
  });

  console.log("data", data);

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-background bg-center bg-cover">
      <div className="w-full bg-50 text-black relative shadow-lg p-4 md:p-8">
        <Navbar />
        {data && (
          <div className="flex flex-col items-start gap-6 md:flex-row justify-between my-8">
            <Temp data={data} />
            <TodayForcast data={data} />
          </div>
        )}

        {data && <Hourly data={data} />}
        {data && <Daily data={data} />}
      </div>
    </main>
  );
}
