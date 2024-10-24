import React from 'react';
import { useCity } from '../context/CityContext';

const CitySelector = () => {
    const { selectedCity, setSelectedCity } = useCity();
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  
    return (
      <div className="mb-8">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded"
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    );
}

export default CitySelector