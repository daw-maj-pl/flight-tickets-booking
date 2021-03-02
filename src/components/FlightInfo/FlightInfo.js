import classes from './FlightInfo.module.css';

const FlightInfo = props => {
  const flightInfoClasses = [classes.FlightInfo];

  if (props.selectedFlight) {
    flightInfoClasses.push(classes.Selected);
  }

  return (
    <div
      className={flightInfoClasses.join(' ')}
      onClick={props.onSelectedFlightClick}
    >
      <h3>Najbliższy dostępny lot: </h3>
      <p>Data wylotu: {new Date(props.departureDate).toLocaleDateString()}</p>
      <p>Godzina wylotu: {props.departureTime}</p>
      <p>Miejsce wylotu: {props.departure}</p>
      <p>Cel podróży: {props.destination}</p>
      <p>Liczba pasażerów: {props.passengers}</p>
    </div>
  );
};

export default FlightInfo;
