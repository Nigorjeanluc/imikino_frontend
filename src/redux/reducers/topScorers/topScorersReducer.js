import { topScorersActionTypes as topScorersTypes } from '../../actionTypes';
import topScorers from '../../initialStates';

export default (state = topScorers, { type, payload }) => {
  switch (type) {
    case topScorersTypes.FETCH_TOP_SCORERS_START:
      return {
        ...state,
        loading: true,
        getTopScorers: { ...state.getTopScorers, message: '', loading: true, errors: {} }
      };
    case topScorersTypes.FETCH_TOP_SCORERS_SUCCESS:
      return {
        ...state,
        listOfTopScorers: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTopScorers: {
          ...state.getTopScorers,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case topScorersTypes.FETCH_TOP_SCORERS_FAILURE:
      return {
        ...state,
        getTopScorers: { ...state.getTopScorers, message: '', loading: false, errors: {} }
      };
    case topScorersTypes.FETCH_TOP_SCORERS_END:
      return {
        ...state,
        errors: payload.error,
        getTopScorers: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
