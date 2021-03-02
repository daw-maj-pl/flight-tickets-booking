import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Details.module.css';
import FlightInfo from '../../components/FlightInfo/FlightInfo';
import PackageSelection from '../../components/PackageSelection/PackageSelection';
import SeatSelection from '../../components/SeatSelection/SeatSelection';

const Details = props => {
  const [searchTerms, setSearchTerms] = useState({});

  const [departureTime, setDepartureTime] = useState(null);
  const [prices, setPrices] = useState([]);
  const [notAvailableSeats, setNotAvailableSeats] = useState(null);

  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [listenersAdded, setListenersAdded] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const searchTerms = {};
    for (let param of query.entries()) {
      searchTerms[param[0]] = param[1];
    }
    setSearchTerms(searchTerms);

    axios
      .get(
        `https://flight-tickets-booking-default-rtdb.firebaseio.com/flight/${
          searchTerms.destination
        }.json?auth=${localStorage.getItem('token')}`
      )
      .then(response => {
        setDepartureTime(response.data.time);
        setPrices(response.data.prices);
        setNotAvailableSeats(response.data['already-booked']);

        // Jeżeli aktualna godzina jest późniejsza niż godzina wylotu w danym dniu, to najbliższy dostępny lot będzie następnego dnia.
        if (
          new Date().toLocaleTimeString().slice(0, 5) >= response.data.time &&
          searchTerms.departureDate === new Date().toISOString().slice(0, 10)
        ) {
          // Metoda getTime() podaje czas w milisekundach.
          // 86400000 milisekund to 24 godziny.
          setSearchTerms(prev => {
            return {
              ...prev,
              departureDate: new Date(new Date().getTime() + 86400000)
                .toISOString()
                .slice(0, 10)
            };
          });
        }
      })
      .catch(err => {
        alert(err.response.data.error);
        props.history.push('/auth');
      });
  }, [props.location.search, props.history]);

  const handleSelectedFlightClick = () => {
    setSelectedFlight(!selectedFlight);
  };

  const handleSelectedPackageClick = selectedPackage => {
    setSelectedPackage(selectedPackage);
  };

  const handleSelectedSeatsClick = selectedSeat => {
    setSelectedSeats(prev => {
      if (prev.length < +searchTerms.passengers) {
        return !prev.includes(selectedSeat)
          ? [...prev, selectedSeat]
          : [...prev.filter(seat => seat !== selectedSeat)];
      } else {
        return !prev.includes(selectedSeat)
          ? [...prev]
          : [...prev.filter(seat => seat !== selectedSeat)];
      }
    });
  };

  const handleListenersAdded = () => {
    setListenersAdded(true);
  };

  return (
    <div className={classes.Details}>
      <h3>Wybierz lot</h3>
      <FlightInfo
        departure={searchTerms.departure}
        destination={searchTerms.destination}
        departureDate={searchTerms.departureDate}
        passengers={searchTerms.passengers}
        departureTime={departureTime}
        selectedFlight={selectedFlight}
        onSelectedFlightClick={handleSelectedFlightClick}
      />
      <h3>Wybierz pakiet</h3>
      <PackageSelection
        prices={prices}
        selectedPackage={selectedPackage}
        onSelectedPackageClick={handleSelectedPackageClick}
      />
      <h3>Wybierz miejsce w samolocie</h3>
      {notAvailableSeats ? (
        <SeatSelection
          destination={searchTerms.destination}
          selectedSeats={selectedSeats}
          notAvailableSeats={notAvailableSeats}
          listenersAdded={listenersAdded}
          onSelectedSeatsClick={handleSelectedSeatsClick}
          onListenersAdded={handleListenersAdded}
        />
      ) : null}

      {selectedFlight &&
      selectedPackage &&
      selectedSeats.length === +searchTerms.passengers ? (
        <div className={classes.Btns}>
          <Link className={classes.Cancel} to="/">
            Powrót
          </Link>

          <Link
            className={classes.Continue}
            to={{
              pathname: '/summary',
              search: `?departure=${searchTerms.departure}&destination=${searchTerms.destination}&departureDate=${searchTerms.departureDate}&passengers=${searchTerms.passengers}&selectedSeats=${selectedSeats}&selectedPackage=${selectedPackage}`
            }}
          >
            Kontynuuj
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
