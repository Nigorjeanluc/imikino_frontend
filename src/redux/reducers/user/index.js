import initialState from '../../initialStates';
import loginReducer from './loginReducer';

export default (state = initialState, action) => {
  const login = loginReducer(state, action);

  return (
    login
    || state
  );
};
