import initialState from '../../initialStates';
import playersReducer from './playersReducer';

export default (state = initialState, action) => {
  const players = playersReducer(state, action);

  return (
    players
    || state
  );
};
