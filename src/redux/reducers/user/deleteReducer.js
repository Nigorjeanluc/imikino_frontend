import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.DELETE_USER_START:
      return {
        ...state,
        login: { ...state.login, message: '', loading: true, errors: '' }
      };
    case userActionTypes.DELETE_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false },
        profile: { ...state.profile }
      };
    case userActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
        profile: {...payload.data},
        errors: ''
      };
    case userActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        message: '',
        errors: payload.error
      };
    default:
      return null;
  }
};
