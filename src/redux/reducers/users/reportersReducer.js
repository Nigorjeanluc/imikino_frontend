import { usersActionTypes as usersTypes } from '../../actionTypes';
import users from '../../initialStates';

export default (state = users, { type, payload }) => {
  switch (type) {
    case usersTypes.FETCH_USERS_START:
      return {
        ...state,
        loading: true,
        getReporters: { ...state.getReporters, message: '', loading: true, errors: {} }
      };
    case usersTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        listOfReporters: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getReporters: {
          ...state.getReporters,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case usersTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        getReporters: { ...state.getReporters, message: '', loading: false, errors: {} }
      };
    case usersTypes.FETCH_USERS_END:
      return {
        ...state,
        errors: payload.error,
        getReporters: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
