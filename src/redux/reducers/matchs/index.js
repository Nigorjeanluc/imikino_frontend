import initialState from '../../initialStates';
import matchsReducer from './matchsReducer';

export default (state = initialState, action) => {
  const matchs = matchsReducer(state, action);

  return (
    matchs
    || state
  );
};
