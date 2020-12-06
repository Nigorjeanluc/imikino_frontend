import openSocket from 'socket.io-client';
import { tableActionTypes as tableTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteTable = (id) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createTable');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/tables/${id}`,
    onStart: tableTypes.DELETE_TABLE_START,
    onEnd: tableTypes.DELETE_TABLE_END,
    onSuccess: tableTypes.DELETE_TABLE_SUCCESS,
    onFailure: tableTypes.DELETE_TABLE_FAILURE
  }));
};
