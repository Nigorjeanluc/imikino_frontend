import openSocket from 'socket.io-client';
import { cardActionTypes as cardTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createCard = (data) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/reporter/cards`,
    onStart: cardTypes.CREATE_CARD_START,
    onEnd: cardTypes.CREATE_CARD_END,
    onSuccess: cardTypes.CREATE_CARD_SUCCESS,
    onFailure: cardTypes.CREATE_CARD_FAILURE
  }));
};
