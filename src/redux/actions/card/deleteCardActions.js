import openSocket from 'socket.io-client';
import { cardActionTypes as cardTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteCard = (slug) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createCard');
  return dispatch(apiAction({
    method: 'card',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/reporter/cards/${slug}`,
    onStart: cardTypes.DELETE_CARD_START,
    onEnd: cardTypes.DELETE_CARD_END,
    onSuccess: cardTypes.DELETE_CARD_SUCCESS,
    onFailure: cardTypes.DELETE_CARD_FAILURE
  }));
};
