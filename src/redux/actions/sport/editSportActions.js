import openSocket from 'socket.io-client';
import { sportActionTypes as sportTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editSport = (id, name) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createSport');
  return dispatch(apiAction({
    method: 'patch',
    data: { name },
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/sports/${id}`,
    onStart: sportTypes.UPDATE_SPORT_START,
    onEnd: sportTypes.UPDATE_SPORT_END,
    onSuccess: sportTypes.UPDATE_SPORT_SUCCESS,
    onFailure: sportTypes.UPDATE_SPORT_FAILURE
  }));
};
