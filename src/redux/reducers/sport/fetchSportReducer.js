import { sportActionTypes as sportTypes } from '../../actionTypes';
import sport from '../../initialStates';

export default (state = sport, { type, payload }) => {
  switch (type) {
    case sportTypes.FETCH_SPORT_START:
      return {
        ...state,
        loading: true,
        getSport: { ...state.getSport, message: '', loading: true, errors: '' }
      };
    case sportTypes.FETCH_SPORT_SUCCESS:
      return {
        ...state,
        sport: {...payload.data},
        loading: false,
        getSport: {
          ...state.getSport,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case sportTypes.FETCH_SPORT_END:
      return {
        ...state,
        getSport: { ...state.getSport }
      };
    case sportTypes.FETCH_SPORT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getSport: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
