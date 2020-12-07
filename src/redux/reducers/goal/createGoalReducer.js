import { goalActionTypes as goalTypes } from '../../actionTypes';
import goal from '../../initialStates';

export default (state = goal, { type, payload }) => {
  switch (type) {
    case goalTypes.CREATE_GOAL_START:
      return {
        ...state,
        loading: true,
        getGoal: { ...state.getGoal, message: '', loading: true, errors: '' }
      };
    case goalTypes.CREATE_GOAL_SUCCESS:
      return {
        ...state,
        goal: {...payload.data},
        loading: false,
        getGoal: {
          ...state.getGoal,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case goalTypes.CREATE_GOAL_END:
      return {
        ...state,
        getGoal: { ...state.getGoal }
      };
    case goalTypes.CREATE_GOAL_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getGoal: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
