import initialState from '../../initialStates';
import createTeamReducer from './createTeamReducer';
import editTeamReducer from './editTeamReducer';
import deleteTeamReducer from './deleteTeamReducer';
import fetchTeamReducer from './fetchTeamReducer';

export default (state = initialState, action) => {
  const createTeam = createTeamReducer(state, action);
  const editTeam = editTeamReducer(state, action);
  const deleteTeam = deleteTeamReducer(state, action);
  const fetchTeam = fetchTeamReducer(state, action);

  return (
    createTeam
    || editTeam
    || deleteTeam
    || fetchTeam
    || state
  );
};
