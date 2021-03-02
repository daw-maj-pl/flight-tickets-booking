import classes from './SeatSelection.module.css';
import Embraer195 from './Embraer195/Embraer195';
import Boing737 from './Boing737/Boing737';
import BoingDreamliner from './BoingDreamliner/BoingDreamliner';

const planes = {
  'EMBRAER 195': 20, //120 miejsc podzielone przez 6 rzędów
  'BOING 737-800': 31, //186 miejsc podzielone przez 6 rzędów
  'BOING 787-8 DREAMLINER': 42 //252 miejsca podzielone przez 6 rzędów
};

const countAllSeats = plane => {
  const allSeats = [];
  const seatInRows = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let i = 1; i <= plane; i++) {
    for (let seatInRow of seatInRows) {
      allSeats.push(i + seatInRow);
    }
  }
  return allSeats;
};

const SeatSelection = props => {
  let plane = null;
  let planeModel = null;
  let allSeats = [];
  switch (props.destination) {
    case 'Gdańsk':
      plane = planes['EMBRAER 195'];
      allSeats = countAllSeats(plane);
      planeModel = (
        <Embraer195
          allSeats={allSeats}
          selectedSeats={props.selectedSeats}
          notAvailableSeats={props.notAvailableSeats}
          listenersAdded={props.listenersAdded}
          onSelectedSeatsClick={props.onSelectedSeatsClick}
          onListenersAdded={props.onListenersAdded}
        />
      );
      break;
    case 'Ateny':
    case 'Barcelona':
    case 'Rzym':
      plane = planes['BOING 737-800'];
      allSeats = countAllSeats(plane);
      planeModel = (
        <Boing737
          allSeats={allSeats}
          selectedSeats={props.selectedSeats}
          notAvailableSeats={props.notAvailableSeats}
          listenersAdded={props.listenersAdded}
          onSelectedSeatsClick={props.onSelectedSeatsClick}
          onListenersAdded={props.onListenersAdded}
        />
      );
      break;
    default:
      plane = planes['BOING 787-8 DREAMLINER'];
      allSeats = countAllSeats(plane);
      planeModel = (
        <BoingDreamliner
          allSeats={allSeats}
          selectedSeats={props.selectedSeats}
          notAvailableSeats={props.notAvailableSeats}
          listenersAdded={props.listenersAdded}
          onSelectedSeatsClick={props.onSelectedSeatsClick}
          onListenersAdded={props.onListenersAdded}
        />
      );
      break;
  }

  return <div className={classes.SeatSelection}>{planeModel}</div>;
};

export default SeatSelection;
