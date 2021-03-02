import classes from './WeatherForecast.module.css';
import WeatherTimeStamp from './WeatherTimeStamp/WeatherTimeStamp';

const WeatherForecast = props => {
  const weatherForecast = props.weatherForecast.results.list.map(timestamp => (
    <WeatherTimeStamp
      key={timestamp.dt}
      time={timestamp.dt_txt}
      temp={timestamp.main.temp}
      icon={timestamp.weather[0].icon}
      description={timestamp.weather[0].description}
    />
  ));

  return (
    <div className={classes.WeatherForecast}>
      <h3>
        Prognoza pogody dla miasta {props.weatherForecast.results.city.name}
      </h3>
      {weatherForecast}
    </div>
  );
};

export default WeatherForecast;
