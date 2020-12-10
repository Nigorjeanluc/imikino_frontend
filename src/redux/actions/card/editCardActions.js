import { cardActionTypes as cardTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editCard = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/cards/${id}`,
    onStart: cardTypes.UPDATE_CARD_START,
    onEnd: cardTypes.UPDATE_CARD_END,
    onSuccess: cardTypes.UPDATE_CARD_SUCCESS,
    onFailure: cardTypes.UPDATE_CARD_FAILURE
  }));
};
