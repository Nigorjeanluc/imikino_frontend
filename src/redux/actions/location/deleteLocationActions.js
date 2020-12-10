import openSocket from 'socket.io-client';
import { locationActionTypes as locationTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteLocation = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createLocation');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/locations/${id}`,
    onStart: locationTypes.DELETE_LOCATION_START,
    onEnd: locationTypes.DELETE_LOCATION_END,
    onSuccess: locationTypes.DELETE_LOCATION_SUCCESS,
    onFailure: locationTypes.DELETE_LOCATION_FAILURE
  }));
};
