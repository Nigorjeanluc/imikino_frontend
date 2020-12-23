import { topScorerActionTypes as topScorerTypes } from '../../actionTypes';
import topScorer from '../../initialStates';

export default (state = topScorer, { type, payload }) => {
  switch (type) {
    case topScorerTypes.UPDATE_TOP_SCORER_START:
      return {
        ...state,
        loading: true,
        getTopScorer: { ...state.getTopScorer, message: '', loading: true, errors: '' }
      };
    case topScorerTypes.UPDATE_TOP_SCORER_SUCCESS:
      return {
        ...state,
        topScorer: {...payload.data},
        loading: false,
        getTopScorer: {
          ...state.getTopScorer,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case topScorerTypes.UPDATE_TOP_SCORER_END:
      return {
        ...state,
        getTopScorer: { ...state.getTopScorer }
      };
    case topScorerTypes.UPDATE_TOP_SCORER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getTopScorer: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
