import { withRouter } from 'react-router-dom';

import classes from './Logout.module.css';

const Logout = props => {
  const handleOnLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    props.history.push('/');
    props.history.go(0);
  };

  return (
    <li className={classes.Logout} onClick={handleOnLogoutClick}>
      <span>{props.children}</span>
    </li>
  );
};

export default withRouter(Logout);
