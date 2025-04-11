/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import bgImageWeather from "../../assets/public/bg-image.jpg";
import { weatherApi } from "../../api/baseUrl";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useOutsideClick } from "../../hook/useOutsideClick";

const Weather = () => {
  const [city, setCity] = useState("Shariatpur");
  const [showModal, setShowModal] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowModal(false));
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

  const loadData = async (inputData: any) => {
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
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowModal(!showModal)}
        className="fixed bottom-5 left-10 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
       <TiWeatherPartlySunny size={24} />
      </button>

      {/* Weather Modal */}
      {showModal && (
        <div ref={ref}
          className="fixed bottom-20 left-12 w-80 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <div
            className="bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${bgImageWeather})` }}
          >
            {/* Input Field & Button */}
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter city"
                className="border p-2 rounded-md w-full"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                Go
              </button>
            </div>

            {/* Weather Info */}
            {weather && weather.main && (
              <div className="mt-4 text-center text-white">
                <div className="flex justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                </div>
                <h2 className="text-xl font-semibold">{weather.name}</h2>
                <p>Temp: {weather.main.temp}°C</p>
                <p>Condition: {weather.weather[0].main}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
