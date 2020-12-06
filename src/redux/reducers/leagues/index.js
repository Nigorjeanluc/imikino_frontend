import initialState from '../../initialStates';
import leaguesReducer from './leaguesReducer';

export default (state = initialState, action) => {
  const leagues = leaguesReducer(state, action);

  return (
    leagues
    || state
  );
};
