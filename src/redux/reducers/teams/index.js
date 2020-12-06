import initialState from '../../initialStates';
import teamsReducer from './teamsReducer';

export default (state = initialState, action) => {
  const teams = teamsReducer(state, action);

  return (
    teams
    || state
  );
};
