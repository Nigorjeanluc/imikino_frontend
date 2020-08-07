import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from './pages/Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

Routes.propTypes = { isAuth: PropTypes.bool, role: PropTypes.string, match: PropTypes.object };
Routes.defaultProps = { match: { params: {} }, isAuth: false, role: 'normal' };

export default connect(null)(Routes);
