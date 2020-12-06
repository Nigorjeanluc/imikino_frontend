import initialState from '../../initialStates';
import sportsReducer from './sportsReducer';

export default (state = initialState, action) => {
  const sports = sportsReducer(state, action);

  return (
    sports
    || state
  );
};
