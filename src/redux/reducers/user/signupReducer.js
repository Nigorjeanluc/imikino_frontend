import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.SIGNUP_USER_START:
      return {
        ...state,
        signup: { ...state.signup, message: '', loading: true, errors: '' }
      };
    case userActionTypes.SIGNUP_USER_END:
      console.log(state)
      return {
        ...state,
        signup: { ...state.signup, loading: false },
        profile: { ...state.profile },
        errors: {...state.errors}
      };
    case userActionTypes.SIGNUP_USER_SUCCESS:
      localStorage.user = JSON.stringify(payload.data.user);
      localStorage.token = payload.data.token;
      return {
        ...state,
        token: payload.data.token,
        signup: { loading: false, message: payload.message, errors: '' },
        profile: payload.data.user
      };
    case userActionTypes.SIGNUP_USER_FAILURE:
      return {
        ...state,
        signup: { loading: false, message: '', errors: payload.error },
        errors: payload.error
      };
    default:
      return null;
  }
};
