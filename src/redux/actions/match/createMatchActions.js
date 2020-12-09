import openSocket from 'socket.io-client';
import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createMatch = (data) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/reporter/matchs`,
    onStart: matchTypes.CREATE_MATCH_START,
    onEnd: matchTypes.CREATE_MATCH_END,
    onSuccess: matchTypes.CREATE_MATCH_SUCCESS,
    onFailure: matchTypes.CREATE_MATCH_FAILURE
  }));
};
