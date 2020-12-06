import openSocket from 'socket.io-client';
import { sportActionTypes as sportTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createSport = (name) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createSport');
  return dispatch(apiAction({
    method: 'post',
    data: { name },
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/sports`,
    onStart: sportTypes.CREATE_SPORT_START,
    onEnd: sportTypes.CREATE_SPORT_END,
    onSuccess: sportTypes.CREATE_SPORT_SUCCESS,
    onFailure: sportTypes.CREATE_SPORT_FAILURE
  }));
};
