import { leagueActionTypes as leagueTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createPlayer = (data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/leagues`,
    onStart: leagueTypes.CREATE_LEAGUE_START,
    onEnd: leagueTypes.CREATE_LEAGUE_END,
    onSuccess: leagueTypes.CREATE_LEAGUE_SUCCESS,
    onFailure: leagueTypes.CREATE_LEAGUE_FAILURE
  }));
};
