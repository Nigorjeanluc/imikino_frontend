import openSocket from 'socket.io-client';
import { locationActionTypes as locationTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createLocation = (name) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createLocation');
  return dispatch(apiAction({
    method: 'post',
    data: { name },
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/locations`,
    onStart: locationTypes.CREATE_LOCATION_START,
    onEnd: locationTypes.CREATE_LOCATION_END,
    onSuccess: locationTypes.CREATE_LOCATION_SUCCESS,
    onFailure: locationTypes.CREATE_LOCATION_FAILURE
  }));
};
