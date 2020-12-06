import initialState from '../../initialStates';
import fetchSportReducer from './fetchSportReducer';
import createSportReducer from './createSportReducer';
import editSportReducer from './editSportReducer';
import deleteSportReducer from './deleteSportReducer';

export default (state = initialState, action) => {
  const fetchSport = fetchSportReducer(state, action);
  const createSport = createSportReducer(state, action);
  const editSport = editSportReducer(state, action);
  const deleteSport = deleteSportReducer(state, action);

  return (
    fetchSport
    || createSport
    || editSport
    || deleteSport
    || state
  );
};
