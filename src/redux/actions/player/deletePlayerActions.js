import openSocket from 'socket.io-client';
import { playerActionTypes as playerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deletePlayer = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createPlayer');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/admin/players/${id}`,
    onStart: playerTypes.DELETE_PLAYER_START,
    onEnd: playerTypes.DELETE_PLAYER_END,
    onSuccess: playerTypes.DELETE_PLAYER_SUCCESS,
    onFailure: playerTypes.DELETE_PLAYER_FAILURE
  }));
};
