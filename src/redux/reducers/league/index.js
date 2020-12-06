import initialState from '../../initialStates';
import createLeagueReducer from './createLeagueReducer';
import deleteLeagueReducer from './deleteLeagueReducer';
import editLeagueReducer from './editLeagueReducer';
import fetchLeagueReducer from './deleteLeagueReducer';

export default (state = initialState, action) => {
  const createLeague = createLeagueReducer(state, action);
  const deleteLeague = deleteLeagueReducer(state, action);
  const fetchLeague = fetchLeagueReducer(state, action);
  const editLeague = editLeagueReducer(state, action);

  return (
    createLeague
    || deleteLeague
    || fetchLeague
    || editLeague
    || state
  );
};
