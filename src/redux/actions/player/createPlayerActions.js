import openSocket from 'socket.io-client';
import { playerActionTypes as playerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createPlayer = (data, options) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createPlayer');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/players`,
    onStart: playerTypes.CREATE_PLAYER_START,
    onEnd: playerTypes.CREATE_PLAYER_END,
    onSuccess: playerTypes.CREATE_PLAYER_SUCCESS,
    onFailure: playerTypes.CREATE_PLAYER_FAILURE
  }));
};
