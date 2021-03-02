import classes from './Booking.module.css';

const Booking = props => {
  return (
    <div className={classes.Booking}>
      <div>Miejsce wylotu: {props.departure}</div>
      <div>Cel podróży: {props.destination}</div>
      <div>Data wylotu: {props.departureDate}</div>
      <div>Godzina wylotu: {props.departureTime}</div>
      <div>Liczba pasażerów: {props.passengers}</div>
      <div>Wybrane miejsca w samolocie: {props.selectedSeats}</div>
      <div>Wybrany pakiet: {props.selectedPackage}</div>
      <div>Szczegóły pakietu: {props.packageInfo}</div>
      <div>Całkowity koszt: {props.totalPrice}</div>
    </div>
  );
};

export default Booking;
