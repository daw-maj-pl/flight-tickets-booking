import classes from './WeatherTimeStamp.module.css';

const weekdayFormat = new Intl.DateTimeFormat('pl', { weekday: 'short' });
const dateFormat = new Intl.DateTimeFormat('pl', { dateStyle: 'short' });
const timeFormat = new Intl.DateTimeFormat('pl', { timeStyle: 'short' });

const WeatherTimeStamp = ({ time, temp, icon, description }) => {
  return (
    <div className={classes.WeatherCard}>
      <div>
        {weekdayFormat.format(new Date(time))}{' '}
        {dateFormat.format(new Date(time))}
      </div>
      <div>{timeFormat.format(new Date(time))}</div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
      </div>
      <div className={classes.Temp}>{Math.round(temp) + '°C'}</div>
      <div>{description}</div>
    </div>
  );
};

export default WeatherTimeStamp;
