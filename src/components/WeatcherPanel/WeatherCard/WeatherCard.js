import { useEffect } from 'react';

import classes from './WeatherCard.module.css';

const WeatherCard = props => {
  const curTime = props.curDate.toString().slice(16, 24);
  const curDate = new Intl.DateTimeFormat('pl', { dateStyle: 'short' }).format(props.curDate);

  useEffect(() => {
    const timer = () => props.onCurDateChange(new Date());
    const intervalId = setInterval(timer, 1000);
    return function cleanup() {
      clearInterval(intervalId);
    };
  });

  return (
    <div className={classes.WeatherCard}>
      <div>{curTime}</div>
      <div>{curDate}</div>
      <div>{props.cityName.toUpperCase()}</div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt={props.description} />
      </div>
      <div className={classes.Temp}>{Math.round(props.temp) + '°C'}</div>
      <div>{props.description}</div>
    </div>
  );
};

export default WeatherCard;
