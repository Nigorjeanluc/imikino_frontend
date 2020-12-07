import { cardsActionTypes as cardsTypes } from '../../actionTypes';
import cards from '../../initialStates';

export default (state = cards, { type, payload }) => {
  switch (type) {
    case cardsTypes.FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
        getCards: { ...state.getCards, message: '', loading: true, errors: {} }
      };
    case cardsTypes.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        listOfCards: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getCards: {
          ...state.getCards,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case cardsTypes.FETCH_CARDS_FAILURE:
      return {
        ...state,
        getCards: { ...state.getCards, message: '', loading: false, errors: {} }
      };
    case cardsTypes.FETCH_CARDS_END:
      return {
        ...state,
        errors: payload.error,
        getCards: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
