import { teamsActionTypes as teamsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllTeams = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/teams?page=${page}&limit=${limit}`,
  onStart: teamsTypes.FETCH_TEAMS_START,
  onEnd: teamsTypes.FETCH_TEAMS_END,
  onSuccess: teamsTypes.FETCH_TEAMS_SUCCESS,
  onFailure: teamsTypes.FETCH_TEAMS_FAILURE
}));

export default getAllTeams;
