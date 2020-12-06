import { sportsActionTypes as sportsTypes } from '../../actionTypes';
import sports from '../../initialStates';

export default (state = sports, { type, payload }) => {
  switch (type) {
    case sportsTypes.FETCH_SPORTS_START:
      return {
        ...state,
        loading: true,
        getSports: { ...state.getSports, message: '', loading: true, errors: {} }
      };
    case sportsTypes.FETCH_SPORTS_SUCCESS:
      return {
        ...state,
        listOfSports: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getSports: {
          ...state.getSports,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case sportsTypes.FETCH_SPORTS_FAILURE:
      return {
        ...state,
        getSports: { ...state.getSports, message: '', loading: false, errors: {} }
      };
    case sportsTypes.FETCH_SPORTS_END:
      return {
        ...state,
        errors: payload.error,
        getSports: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
