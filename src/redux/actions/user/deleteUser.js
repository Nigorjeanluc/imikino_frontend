import openSocket from 'socket.io-client';
import { userActionTypes as userTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteUser = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createUser');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/users/${id}`,
    onStart: userTypes.DELETE_USER_START,
    onEnd: userTypes.DELETE_USER_END,
    onSuccess: userTypes.DELETE_USER_SUCCESS,
    onFailure: userTypes.DELETE_USER_FAILURE
  }));
};
