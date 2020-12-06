import openSocket from 'socket.io-client';
import { sportActionTypes as sportTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteSport = (id) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createSport');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/sports/${id}`,
    onStart: sportTypes.DELETE_SPORT_START,
    onEnd: sportTypes.DELETE_SPORT_END,
    onSuccess: sportTypes.DELETE_SPORT_SUCCESS,
    onFailure: sportTypes.DELETE_SPORT_FAILURE
  }));
};
