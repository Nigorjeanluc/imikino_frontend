import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from './pages/Home';
import Livescore from './pages/Livescore';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/livescores" component={Livescore} />
    </Switch>
  );
}

Routes.propTypes = { isAuth: PropTypes.bool, role: PropTypes.string, match: PropTypes.object };
Routes.defaultProps = { match: { params: {} }, isAuth: false, role: 'normal' };

export default connect(null)(Routes);
