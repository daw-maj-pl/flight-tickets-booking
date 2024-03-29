import { Fragment } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = props => (
  <Fragment>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
