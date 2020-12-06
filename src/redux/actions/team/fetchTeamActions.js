import { teamActionTypes as teamTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getTeam = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/teams/${id}`,
  onStart: teamTypes.FETCH_TEAM_START,
  onEnd: teamTypes.FETCH_TEAM_END,
  onSuccess: teamTypes.FETCH_TEAM_SUCCESS,
  onFailure: teamTypes.FETCH_TEAM_FAILURE
}));

export default getTeam;
