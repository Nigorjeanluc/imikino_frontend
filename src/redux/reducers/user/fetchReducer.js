import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.FETCH_USER_START:
      return {
        ...state,
        login: { ...state.login, message: '', loading: true, errors: '' }
      };
    case userActionTypes.FETCH_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false },
        profile: { ...state.profile }
      };
    case userActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
        profile: {...payload.data.user},
        errors: ''
      };
    case userActionTypes.FETCH_USER_FAILURE:
      localStorage.clear();
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
