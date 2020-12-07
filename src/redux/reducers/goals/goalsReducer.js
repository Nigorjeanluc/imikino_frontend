import { goalsActionTypes as goalsTypes } from '../../actionTypes';
import goals from '../../initialStates';

export default (state = goals, { type, payload }) => {
  switch (type) {
    case goalsTypes.FETCH_GOALS_START:
      return {
        ...state,
        loading: true,
        getGoals: { ...state.getGoals, message: '', loading: true, errors: {} }
      };
    case goalsTypes.FETCH_GOALS_SUCCESS:
      return {
        ...state,
        listOfGoals: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getGoals: {
          ...state.getGoals,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case goalsTypes.FETCH_GOALS_FAILURE:
      return {
        ...state,
        getGoals: { ...state.getGoals, message: '', loading: false, errors: {} }
      };
    case goalsTypes.FETCH_GOALS_END:
      return {
        ...state,
        errors: payload.error,
        getGoals: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
