import initialState from '../../initialStates';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import logoutReducer from './logoutReducer';
import fetchReducer from './fetchReducer';
import createReducer from './createReducer';

export default (state = initialState, action) => {
  const login = loginReducer(state, action);
  const signup = signupReducer(state, action);
  const logout = logoutReducer(state, action);
  const fetch = fetchReducer(state, action);
  const create = createReducer(state, action);

  return (
    login
    || create
    || fetch
    || logout
    || signup
    || state
  );
};
