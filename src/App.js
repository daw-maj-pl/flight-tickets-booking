import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import HomaPage from './containers/HomePage/HomePage';
import Details from './containers/Details/Details';
import Summary from './containers/Summary/Summary';
import Bookings from './containers/Bookings/Bookings';
import Auth from './containers/Auth/Auth';

const App = () => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomaPage} />
        <Route path="/details" exact component={Details} />
        <Route path="/summary" exact component={Summary} />
        <Route path="/bookings" exact component={Bookings} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Layout>
  </div>
);

export default App;
