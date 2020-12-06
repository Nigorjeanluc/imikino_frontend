import initialState from '../../initialStates';
import createPlayerReducer from './createPlayerReducer';
import fetchPlayerReducer from './fetchPlayerReducer';
import editPlayerReducer from './editPlayerReducer';
import deletePlayerReducer from './deletePlayerReducer';

export default (state = initialState, action) => {
  const createPlayer = createPlayerReducer(state, action);
  const fetchPlayer = fetchPlayerReducer(state, action);
  const editPlayer = editPlayerReducer(state, action);
  const deletePlayer = deletePlayerReducer(state, action);

  return (
    createPlayer
    || fetchPlayer
    || editPlayer
    || deletePlayer
    || state
  );
};
