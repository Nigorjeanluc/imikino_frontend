import { leagueActionTypes as leagueTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editLeague = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/leagues/${id}`,
    onStart: leagueTypes.UPDATE_LEAGUE_START,
    onEnd: leagueTypes.UPDATE_LEAGUE_END,
    onSuccess: leagueTypes.UPDATE_LEAGUE_SUCCESS,
    onFailure: leagueTypes.UPDATE_LEAGUE_FAILURE
  }));
};
