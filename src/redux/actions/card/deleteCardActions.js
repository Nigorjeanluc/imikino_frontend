import openSocket from 'socket.io-client';
import { cardActionTypes as cardTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteCard = (id) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token
    },
    url: `${BASIC_URL}/reporter/cards/${id}`,
    onStart: cardTypes.DELETE_CARD_START,
    onEnd: cardTypes.DELETE_CARD_END,
    onSuccess: cardTypes.DELETE_CARD_SUCCESS,
    onFailure: cardTypes.DELETE_CARD_FAILURE
  }));
};
