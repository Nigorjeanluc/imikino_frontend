import initialState from '../../initialStates';
import goalsReducer from './goalsReducer';

export default (state = initialState, action) => {
  const goals = goalsReducer(state, action);

  return (
    goals
    || state
  );
};
