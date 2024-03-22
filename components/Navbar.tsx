import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";
import Search from "./Search";
import axios from "axios";
import { placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

const Navbar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [place, setplace] = useAtom(placeAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=a26d6e4f3d89b360961d031198892418`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setshowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setshowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setshowSuggestions(false);
    }
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
    } else {
      setError("");
      setplace(city);
    }
  }

  function currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a26d6e4f3d89b360961d031198892418`
          );

          setplace(response.data.name);
        } catch (error) {
          console.log("cannot detect location");
          throw error;
        }
      });
    }
  }

  return (
    <section className="flex flex-col items-center gap-4 md:flex-row justify-between">
      <div className="flex items-center gap-4 text-3xl md:text-5xl">
        <h1 className="font-semibold">Weatheria</h1>
        <TiWeatherCloudy className="text-yellow-700" />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <FaLocationDot
          title="Your Current Location"
          className="text-xl cursor-pointer hover:scale-125"
          onClick={currentLocation}
        />
        <Search
          value={city}
          onChange={(e) => handleInputChange(e.target.value)}
          onSubmit={handleSubmiSearch}
        />
      </div>
    </section>
  );
};

export default Navbar;
