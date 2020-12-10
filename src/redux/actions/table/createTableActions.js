import openSocket from 'socket.io-client';
import { tableActionTypes as tableTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createTable = (league_id, data) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createTable');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/tables/${league_id}`,
    onStart: tableTypes.CREATE_TABLE_START,
    onEnd: tableTypes.CREATE_TABLE_END,
    onSuccess: tableTypes.CREATE_TABLE_SUCCESS,
    onFailure: tableTypes.CREATE_TABLE_FAILURE
  }));
};
