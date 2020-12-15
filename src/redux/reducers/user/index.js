import initialState from '../../initialStates';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import logoutReducer from './logoutReducer';
import fetchReducer from './fetchReducer';
import createReducer from './createReducer';
import deleteReducer from './deleteReducer';

export default (state = initialState, action) => {
  const login = loginReducer(state, action);
  const signup = signupReducer(state, action);
  const logout = logoutReducer(state, action);
  const fetch = fetchReducer(state, action);
  const create = createReducer(state, action);
  const deleteUser = deleteReducer(state, action);

  return (
    login
    || deleteUser
    || create
    || fetch
    || logout
    || signup
    || state
  );
};
