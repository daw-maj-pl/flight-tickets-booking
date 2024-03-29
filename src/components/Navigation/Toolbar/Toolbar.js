import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = () => (
  <header className={classes.Toolbar}>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
