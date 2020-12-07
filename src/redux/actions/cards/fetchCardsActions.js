import { cardsActionTypes as cardsTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllCards = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/cards?page=${page}&limit=${limit}`,
  onStart: cardsTypes.FETCH_CARDS_START,
  onEnd: cardsTypes.FETCH_CARDS_END,
  onSuccess: cardsTypes.FETCH_CARDS_SUCCESS,
  onFailure: cardsTypes.FETCH_CARDS_FAILURE
}));

export default getAllCards;
