import openSocket from 'socket.io-client';
import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteMatch = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/reporter/matchs/${id}`,
    onStart: matchTypes.DELETE_MATCH_START,
    onEnd: matchTypes.DELETE_MATCH_END,
    onSuccess: matchTypes.DELETE_MATCH_SUCCESS,
    onFailure: matchTypes.DELETE_MATCH_FAILURE
  }));
};
