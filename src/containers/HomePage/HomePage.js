import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './HomePage.module.css';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import WeatherPanel from '../../components/WeatherPanel/WeatherPanel';

const HomePage = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [curWeather, setCurWeather] = useState(null);

  const [departure, setDeparture] = useState('Katowice');
  const [destination, setDestination] = useState('Gdańsk');
  const [departureDate, setDepartureDate] = useState(curDate.toISOString().slice(0, 10));
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${departure}&appid=9b524e583c2776dd6f15ffa119805481&units=metric&lang=pl`
      )
      .then(response => {
        setCurWeather(response.data);
      });
  }, [departure]);

  const handleDepartureChange = event => {
    setDeparture(event.target.value);
  };

  const handleDestinationChange = event => {
    setDestination(event.target.value);
  };
  const handleDepartureDateChange = event => {
    setDepartureDate(event.target.value);
  };
  const handlePassengersChange = event => {
    setPassengers(event.target.value);
  };

  const handleCurDateChange = newDate => {
    setCurDate(newDate);
  };

  return (
    <div className={classes.HomePage}>
      <SearchPanel
        curDate={curDate}
        departure={departure}
        destination={destination}
        departureDate={departureDate}
        passengers={passengers}
        onDepartureChange={handleDepartureChange}
        onDestinationChange={handleDestinationChange}
        onDepartureDateChange={handleDepartureDateChange}
        onPassengersChange={handlePassengersChange}
      />
      <WeatherPanel
        curDate={curDate}
        curWeather={curWeather}
        onCurDateChange={handleCurDateChange}
      />
    </div>
  );
};

export default HomePage;
