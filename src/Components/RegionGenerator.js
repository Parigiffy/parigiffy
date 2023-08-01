import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const LocationGenerator = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  useEffect(() => {
    // Set the default values for state and city forms
    setSelectedState(null);
    setCities([]);
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    if (selectedOption) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedOption.value
      ).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(cities);
    } else {
      setCities([]);
    }
  };

  return (
    <div>
      <h2>Location Generator</h2>
      <div>
        <h3>Country</h3>
        <Select
          options={countries}
          onChange={handleCountryChange}
          value={selectedCountry}
        />
      </div>

      <div>
        <h3>State</h3>
        <Select
          options={states}
          onChange={handleStateChange}
          value={selectedState}
        />
      </div>

      <div>
        <h3>City</h3>
        <Select options={cities} />
      </div>
    </div>
  );
};

export default LocationGenerator;
