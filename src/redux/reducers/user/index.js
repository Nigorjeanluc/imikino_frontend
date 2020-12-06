import initialState from '../../initialStates';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import logoutReducer from './logoutReducer';

export default (state = initialState, action) => {
  const login = loginReducer(state, action);
  const signup = signupReducer(state, action);
  const logout = logoutReducer(state, action);

  return (
    login
    || logout
    || signup
    || state
  );
};
