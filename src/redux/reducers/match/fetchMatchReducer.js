import { matchActionTypes as matchTypes } from '../../actionTypes';
import match from '../../initialStates';

export default (state = match, { type, payload }) => {
  switch (type) {
    case matchTypes.FETCH_MATCH_START:
      return {
        ...state,
        loading: true,
        getMatch: { ...state.getMatch, message: '', loading: true, errors: '' }
      };
    case matchTypes.FETCH_MATCH_SUCCESS:
      return {
        ...state,
        match: {...payload.data},
        loading: false,
        getMatch: {
          ...state.getMatch,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case matchTypes.FETCH_MATCH_END:
      return {
        ...state,
        getMatch: { ...state.getMatch }
      };
    case matchTypes.FETCH_MATCH_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getMatch: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
