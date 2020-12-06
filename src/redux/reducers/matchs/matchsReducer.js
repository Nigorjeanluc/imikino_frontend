import { matchsActionTypes as matchsTypes } from '../../actionTypes';
import matchs from '../../initialStates';

export default (state = matchs, { type, payload }) => {
  switch (type) {
    case matchsTypes.FETCH_MATCHS_START:
      return {
        ...state,
        loading: true,
        getMatchs: { ...state.getMatchs, message: '', loading: true, errors: {} }
      };
    case matchsTypes.FETCH_MATCHS_SUCCESS:
      return {
        ...state,
        listOfMatchs: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getMatchs: {
          ...state.getMatchs,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case matchsTypes.FETCH_MATCHS_FAILURE:
      return {
        ...state,
        getMatchs: { ...state.getMatchs, message: '', loading: false, errors: {} }
      };
    case matchsTypes.FETCH_MATCHS_END:
      return {
        ...state,
        errors: payload.error,
        getMatchs: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
