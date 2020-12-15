import openSocket from 'socket.io-client';
import { userActionTypes as userTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createUser = (data) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createUser');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/user`,
    onStart: userTypes.CREATE_USER_START,
    onEnd: userTypes.CREATE_USER_END,
    onSuccess: userTypes.CREATE_USER_SUCCESS,
    onFailure: userTypes.CREATE_USER_FAILURE
  }));
};
