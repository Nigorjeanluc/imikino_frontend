import openSocket from 'socket.io-client';
import { locationActionTypes as locationTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editLocation = (id, name) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createLocation');
  return dispatch(apiAction({
    method: 'patch',
    data: { name },
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/locations/${id}`,
    onStart: locationTypes.UPDATE_LOCATION_START,
    onEnd: locationTypes.UPDATE_LOCATION_END,
    onSuccess: locationTypes.UPDATE_LOCATION_SUCCESS,
    onFailure: locationTypes.UPDATE_LOCATION_FAILURE
  }));
};
