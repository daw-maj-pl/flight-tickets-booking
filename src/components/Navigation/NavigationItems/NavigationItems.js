import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Logout from './Logout/Logout';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Strona Główna
    </NavigationItem>
    <NavigationItem link="/bookings" exact>
      Rezerwacje
    </NavigationItem>
    {localStorage.getItem('token') ? (
      <Logout>Wyloguj się</Logout>
    ) : (
      <NavigationItem link="/auth" exact>
        Zaloguj się
      </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
