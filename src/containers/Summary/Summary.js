import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Summary.module.css';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import Spinner from '../../components/UI/Spinner/Spinner';

const Summary = props => {
  const [selectedCurrency, setSelectedCurrency] = useState('PLN');

  const [totalPrice, setTotalPrice] = useState(null);
  const [prices, setPrices] = useState([]);

  const [departureTime, setDepartureTime] = useState(null);
  const [packageInfo, setPackageInfo] = useState('');

  const [weatherForecast, setWeatherForecast] = useState(null);

  const toConfirm = {};
  const query = new URLSearchParams(props.location.search);
  for (let param of query.entries()) {
    toConfirm[param[0]] = param[1];
  }

  useEffect(() => {
    axios
      .get(
        `https://flight-tickets-booking-default-rtdb.firebaseio.com/flight/${
          toConfirm.destination
        }.json?auth=${localStorage.getItem('token')}`
      )
      .then(response => {
        setPrices(response.data.prices);
        setTotalPrice(response.data.prices[toConfirm.selectedPackage] * toConfirm.passengers);
        setDepartureTime(response.data.time);
      });

    axios
      .get(
        `https://flight-tickets-booking-default-rtdb.firebaseio.com/packages.json?auth=${localStorage.getItem(
          'token'
        )}`
      )
      .then(response => {
        setPackageInfo(response.data[toConfirm.selectedPackage]);
      });

    let today = new Date();
    let departureDate = new Date(toConfirm.departureDate);
    // 1382400000 milisekund to 16 dni.
    if (today.getTime() + 1382400000 > departureDate.getTime()) {
      let cityName = toConfirm.destination;
      if (toConfirm.destination === 'Gdańsk') cityName = 'Gdansk';
      axios
        .get(`https://hide-api-key.herokuapp.com/api/search?q=${cityName}`)
        .then(response => {
          setWeatherForecast(response.data);
        });
    } else {
      setWeatherForecast('stopSpinner');
    }
  }, [
    toConfirm.destination,
    toConfirm.passengers,
    toConfirm.selectedPackage,
    toConfirm.departureDate
  ]);

  const handleCurrencyRateChange = event => {
    setSelectedCurrency(event.target.value);
    if (event.target.value === 'PLN') {
      setTotalPrice(prices[toConfirm.selectedPackage] * toConfirm.passengers);
    } else {
      axios
        .get(
          `http://api.nbp.pl/api/exchangerates/rates/a/${event.target.value}/`
        )
        .then(response => {
          setTotalPrice(
            (
              (prices[toConfirm.selectedPackage] * toConfirm.passengers) /
              response.data.rates[0].mid
            ).toFixed(2)
          );
        });
    }
  };

  const handleConfirmClick = () => {
    const booking = {
      departure: toConfirm.departure,
      destination: toConfirm.destination,
      departureDate: new Date(toConfirm.departureDate).toLocaleDateString(),
      departureTime: departureTime,
      passengers: toConfirm.passengers,
      selectedSeats: toConfirm.selectedSeats,
      selectedPackage: toConfirm.selectedPackage,
      packageInfo: packageInfo,
      totalPrice: `${totalPrice} ${selectedCurrency}`,
      userId: localStorage.getItem('userId')
    };

    axios
      .post(
        `https://flight-tickets-booking-default-rtdb.firebaseio.com/bookings.json?auth=${localStorage.getItem(
          'token'
        )}`,
        booking
      )
      .then(response => {
        alert(
          'Operacja przebiegła pomyślnie! Zakupione bilety znajdziesz w zakładce "Rezerwacje".'
        );
        props.history.push('/');
      })
      .catch(err => {
        alert(err.response.data.error);
        props.history.push('/auth');
      });
  };

  return (
    <div className={classes.Summary}>
      <div className={classes.MainInfo}>
        <h3>Podsumowanie</h3>
        <div>Miejsce wylotu: {toConfirm.departure}</div>
        <div>Cel podróży: {toConfirm.destination}</div>
        <div>Data wylotu: {new Date(toConfirm.departureDate).toLocaleDateString()}</div>
        <div>Godzina wylotu: {departureTime}</div>
        <div>Liczba pasażerów: {toConfirm.passengers}</div>
        <div>Wybrane miejsca w samolocie: {toConfirm.selectedSeats}</div>
        <div>Wybrany pakiet: {toConfirm.selectedPackage}</div>
        <div>Szczegóły pakietu: {packageInfo}</div>
        <div className={classes.TotalPrice}>
          {totalPrice ? <div>Całkowity koszt: <strong>{totalPrice} {selectedCurrency}</strong></div> : null}
        </div>
        <select
          className={classes.SelectCurrency}
          onChange={handleCurrencyRateChange}
        >
          <option value="PLN">PLN</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="JPY">JPY</option>
        </select>
        <br />
        <button className={classes.ConfirmBtn} onClick={handleConfirmClick}>
          Potwierdź zakup
        </button>
      </div>
      {weatherForecast ? (
        weatherForecast !== 'stopSpinner' ? (
          <WeatherForecast weatherForecast={weatherForecast} />
        ) : null
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Summary;
