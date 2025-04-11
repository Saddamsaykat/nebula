/* eslint-disable @typescript-eslint/no-explicit-any */
// In Register Component

import { useState } from "react";
import { useGetCountryQuery } from "../../redux/slice/restApi/restApiSlice";

// In City Component
const City = ({
  selectedCity,
  setSelectedCity,
}: {
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}) => {
  const { data: countries = [], isLoading, isError } = useGetCountryQuery();
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading countries.</p>;
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full p-2 border border-gray-300 rounded flex items-center justify-between"
      >
        {selectedCity ? (
          <span className="text-black">{selectedCity}</span>
        ) : (
          <span className="text-black">Select a capital city</span>
        )}
        <span>▼</span>
      </button>

      {showDropdown && (
        <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-auto border bg-black text-white border-black rounded shadow-md">
          {[...countries]
            .sort(
              (a: any, b: any) =>
                a.capital?.[0]?.localeCompare(b.capital?.[0]) || 0
            )
            .map((country: any, index: number) => {
              const capital = country.capital
                ? country.capital[0]
                : "No Capital";
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedCity(capital);
                    setShowDropdown(false);
                  }}
                  className="p-2 hover:bg-white hover:text-black cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={country?.flags?.png}
                    alt="flag"
                    className="w-6 h-4"
                  />{" "}
                  {capital}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
export default City;
