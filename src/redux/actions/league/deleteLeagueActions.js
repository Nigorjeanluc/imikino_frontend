import openSocket from 'socket.io-client';
import { leagueActionTypes as leagueTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteLeague = (id) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createLeague');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${LOCAL_URL}/admin/leagues/${id}`,
    onStart: leagueTypes.DELETE_LEAGUE_START,
    onEnd: leagueTypes.DELETE_LEAGUE_END,
    onSuccess: leagueTypes.DELETE_LEAGUE_SUCCESS,
    onFailure: leagueTypes.DELETE_LEAGUE_FAILURE
  }));
};
