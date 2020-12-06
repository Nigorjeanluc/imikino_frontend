import openSocket from 'socket.io-client';
import { teamActionTypes as teamTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteTeam = (id) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createTeam');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${LOCAL_URL}/admin/teams/${id}`,
    onStart: teamTypes.DELETE_TEAM_START,
    onEnd: teamTypes.DELETE_TEAM_END,
    onSuccess: teamTypes.DELETE_TEAM_SUCCESS,
    onFailure: teamTypes.DELETE_TEAM_FAILURE
  }));
};
