import initialState from '../../initialStates';
import topScorersReducer from './topScorersReducer';

export default (state = initialState, action) => {
  const topScorers = topScorersReducer(state, action);

  return (
    topScorers
    || state
  );
};
