import classes from './WeatherPanel.module.css';
import WeatherCard from './WeatherCard/WeatherCard';

const WeatherPanel = props => {
  let weatherCard = null;
  if (props.curWeather) {
    weatherCard = (
      <WeatherCard
        curDate={props.curDate}
        cityName={props.curWeather.name}
        icon={props.curWeather.weather[0].icon}
        temp={props.curWeather.main.temp}
        description={props.curWeather.weather[0].description}
        onCurDateChange={props.onCurDateChange}
      />
    );
  }
  return <div className={classes.WeatherPanel}>{weatherCard}</div>;
};

export default WeatherPanel;
