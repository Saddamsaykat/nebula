/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import bgImageWeather from "../../assets/public/bg-image.jpg";
import { weatherApi } from "../../api/baseUrl";

const Weather = () => {
  const [city, setCity] = useState("Dhaka");
  interface WeatherData {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const loadData = async (inputData : any) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=${weatherApi}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    loadData(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      loadData(city);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4 bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bgImageWeather})` }}
    >
      {/* Input Field & Button */}
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className="border p-2 rounded-md mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 p-2 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Weather Information */}
      {weather && weather.main && (
        <div className="mt-4 text-center">
          <div className="flex justify-center items-center ">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
          <h2 className="text-2xl text-white font-semibold">{weather.name}</h2>
          <p className="text-lg text-white">
            Temperature: {weather.main.temp}°C
          </p>
          <p className="text-lg text-white">
            Condition: {weather.weather[0].main}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
