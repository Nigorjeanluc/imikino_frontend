import { cardActionTypes as cardTypes } from '../../actionTypes';
import card from '../../initialStates';

export default (state = card, { type, payload }) => {
  switch (type) {
    case cardTypes.FETCH_CARD_START:
      return {
        ...state,
        loading: true,
        getCard: { ...state.getCard, message: '', loading: true, errors: '' }
      };
    case cardTypes.FETCH_CARD_SUCCESS:
      return {
        ...state,
        card: {...payload.data},
        loading: false,
        getCard: {
          ...state.getCard,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case cardTypes.FETCH_CARD_END:
      return {
        ...state,
        getCard: { ...state.getCard }
      };
    case cardTypes.FETCH_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getCard: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
