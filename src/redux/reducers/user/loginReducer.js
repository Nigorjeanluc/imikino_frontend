import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.LOGIN_USER_START:
      return {
        ...state,
        login: { ...state.login, message: '', loading: true, errors: '' }
      };
    case userActionTypes.LOGIN_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false }
      };
    case userActionTypes.LOGIN_USER_SUCCESS:
      localStorage.user = JSON.stringify(payload.data.user);
      localStorage.token = payload.data.token;
      return {
        ...state,
        token: payload.data.token,
        login: { loading: false, user: payload.data.user, message: payload.message, errors: '' }
      };
    case userActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        login: { loading: false, message: '', errors: payload.error }
      };
    default:
      return null;
  }
};
