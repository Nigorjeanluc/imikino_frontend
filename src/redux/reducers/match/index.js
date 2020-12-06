import initialState from '../../initialStates';
import createMatchReducer from './createMatchReducer';
import deleteMatchReducer from './deleteMatchReducer';
import editMatchReducer from './editMatchReducer';
import fetchMatchReducer from './fetchMatchReducer';

export default (state = initialState, action) => {
  const createMatch = createMatchReducer(state, action);
  const deleteMatch = deleteMatchReducer(state, action);
  const editMatch = editMatchReducer(state, action);
  const fetchMatch = fetchMatchReducer(state, action);

  return (
    createMatch
    || deleteMatch
    || editMatch
    || fetchMatch
    || state
  );
};
