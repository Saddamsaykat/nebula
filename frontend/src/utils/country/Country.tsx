/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetCountryQuery } from "../../redux/slice/restApi/restApiSlice";

const Country = ({
  setSelectedCountry,
  selectedCountry,
}: {
  setSelectedCountry: (country: any) => void;
  selectedCountry: any;
}) => {
  const { data: countries = [], isLoading, isError } = useGetCountryQuery();
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading) return <p className="text-black">Loading...</p>;
  if (isError) return <p className="text-black">Error loading countries.</p>;

  return (
    <div className="relative w-full">
      <label htmlFor="country" className="text-black">
        Country
      </label>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full p-2 border border-gray-300 rounded flex items-center justify-between"
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedCountry.flags?.png}
              alt="flag"
              className="w-6 h-4"
            />
            <span className="text-black">{selectedCountry.name?.common}</span>
          </div>
        ) : (
          <span className="text-black">Select a country</span>
        )}
        <span>▼</span>
      </button>

      {showDropdown && (
        <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-auto border bg-black text-white border-black rounded shadow-md">
          {[...countries]
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((country: any, index: number) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCountry(country);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 p-2 hover:bg-white hover:text-black cursor-pointer"
              >
                <img src={country?.flags?.png} alt="flag" className="w-6 h-4" />
                <span>{country?.name?.common}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Country;
