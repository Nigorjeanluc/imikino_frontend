import openSocket from 'socket.io-client';
import { tableActionTypes as tableTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editTable = (id, data) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createTable');
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: { token: localStorage.token },
    url: `${LOCAL_URL}/admin/tables/${id}`,
    onStart: tableTypes.UPDATE_TABLE_START,
    onEnd: tableTypes.UPDATE_TABLE_END,
    onSuccess: tableTypes.UPDATE_TABLE_SUCCESS,
    onFailure: tableTypes.UPDATE_TABLE_FAILURE
  }));
};
