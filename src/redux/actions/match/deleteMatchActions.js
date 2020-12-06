import openSocket from 'socket.io-client';
import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteMatch = (slug) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/reporter/matchs/${slug}`,
    onStart: matchTypes.DELETE_MATCH_START,
    onEnd: matchTypes.DELETE_MATCH_END,
    onSuccess: matchTypes.DELETE_MATCH_SUCCESS,
    onFailure: matchTypes.DELETE_MATCH_FAILURE
  }));
};
