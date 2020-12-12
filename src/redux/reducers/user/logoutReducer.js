import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.LOGOUT_USER_START:
      return {
        ...state,
        logout: { ...state.logout, loading: true }
      };
    case userActionTypes.LOGOUT_USER_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        token: undefined,
        profile: undefined,
        logout: { ...state.logout, errors: '', message: payload.message }
      };
    case userActionTypes.LOGOUT_USER_FAILURE:
      return {
        ...state,
        logout: { ...state.logout, errors: payload, message: '' }
      };
    case userActionTypes.LOGOUT_USER_END:
      return {
        ...state,
        logout: { ...state.logout, loading: false }
      };
    default:
      return null;
  }
};
