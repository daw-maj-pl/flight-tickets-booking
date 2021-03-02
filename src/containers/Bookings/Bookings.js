import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Bookings.module.css';
import Booking from '../../components/Booking/Booking';

const Bookings = props => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const queryParams = `?auth=${localStorage.getItem('token')}&orderBy="userId"&equalTo="${localStorage.getItem('userId')}"`;
    axios.get(`https://flight-tickets-booking-default-rtdb.firebaseio.com/bookings.json${queryParams}`)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }

        setBookings(fetchedOrders);
      })
      .catch(err => {
        alert(err.response.data.error);
        props.history.push('/auth');
      });
  }, [props.history]);

  return (
    <div className={classes.Bookings}>
      {bookings.map(booking => (
        <Booking
          key={booking.id}
          departure={booking.departure}
          destination={booking.destination}
          departureDate={booking.departureDate}
          departureTime={booking.departureTime}
          passengers={booking.passengers}
          selectedSeats={booking.selectedSeats}
          selectedPackage={booking.selectedPackage}
          packageInfo={booking.packageInfo}
          totalPrice={booking.totalPrice}
        />
      ))}
    </div>
  );
};

export default Bookings;
