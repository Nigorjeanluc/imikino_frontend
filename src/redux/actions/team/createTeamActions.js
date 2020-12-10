import openSocket from 'socket.io-client';
import { teamActionTypes as teamTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createTeam = (data, options) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createTeam');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/teams`,
    onStart: teamTypes.CREATE_TEAM_START,
    onEnd: teamTypes.CREATE_TEAM_END,
    onSuccess: teamTypes.CREATE_TEAM_SUCCESS,
    onFailure: teamTypes.CREATE_TEAM_FAILURE
  }));
};
