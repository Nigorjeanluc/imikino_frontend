import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from './pages/Home';
import Livescore from './pages/Livescore';
import Transfer from './pages/Transfer';
import News from './pages/News';
import Tables from './pages/Tables';
import Teams from './pages/Teams';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/livescores" component={Livescore} />
      <Route exact path="/transfers" component={Transfer} />
      <Route exact path="/news" component={News} />
      <Route exact path="/tables" component={Tables} />
      <Route exact path="/teams" component={Teams} />
    </Switch>
  );
}

Routes.propTypes = { isAuth: PropTypes.bool, role: PropTypes.string, match: PropTypes.object };
Routes.defaultProps = { match: { params: {} }, isAuth: false, role: 'normal' };

export default connect(null)(Routes);
