import { cardActionTypes as cardTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingleCard = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/cards/${id}`,
  onStart: cardTypes.FETCH_CARD_START,
  onEnd: cardTypes.FETCH_CARD_END,
  onSuccess: cardTypes.FETCH_CARD_SUCCESS,
  onFailure: cardTypes.FETCH_CARD_FAILURE
}));

export default getSingleCard;
