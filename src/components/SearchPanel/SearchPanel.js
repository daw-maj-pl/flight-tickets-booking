import { withRouter } from 'react-router-dom';

import classes from './SearchPanel.module.css';

const SearchPanel = props => {
  const handleSearchSubmit = event => {
    event.preventDefault();
    props.history.push({
      pathname: '/details',
      search: `?departure=${props.departure}&destination=${props.destination}&departureDate=${props.departureDate}&passengers=${props.passengers}`
    });
  };

  return (
    <div className={classes.SearchPanel}>
      <form onSubmit={handleSearchSubmit}>
        <div className={classes.Input}>
          <label>Z</label>
          <br />
          <select
            className={classes.Inp}
            value={props.departure}
            onChange={props.onDepartureChange}
          >
            <option value="Katowice">Katowice</option>
            <option value="Krakow">Kraków</option>
            <option value="Wroclaw">Wrocław</option>
          </select>
        </div>

        <div className={classes.Input}>
          <label>DO</label>
          <br />
          <select
            className={classes.Inp}
            value={props.destination}
            onChange={props.onDestinationChange}
          >
            <option value="Gdańsk">Gdańsk</option>
            <option value="Ateny">Ateny</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Rzym">Rzym</option>
            <option value="Montreal">Montreal</option>
            <option value="Tokio">Tokio</option>
            <option value="Waszyngton">Waszyngton</option>
          </select>
        </div>

        <div className={classes.Input}>
          <label>DATA WYLOTU</label>
          <br />
          <input
            className={classes.Inp}
            value={props.departureDate}
            type="date"
            min={props.curDate.toISOString().slice(0, 10)}
            onChange={props.onDepartureDateChange}
          />
        </div>

        <div className={classes.Input}>
          <label>LICZBA PASAŻERÓW</label>
          <br />
          <input
            className={classes.Inp}
            value={props.passengers}
            type="number"
            min="1"
            onChange={props.onPassengersChange}
          />
        </div>

        <div className={classes.Input}>
          <br />
          <input
            className={[classes.Inp, classes.Search].join(' ')}
            value="Szukaj"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(SearchPanel);
