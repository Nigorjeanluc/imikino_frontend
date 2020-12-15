import { userActionTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.CREATE_USER_START:
      return {
        ...state,
        login: { ...state.login, message: '', loading: true, errors: '' }
      };
    case userActionTypes.CREATE_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false },
        profile: { ...state.profile }
      };
    case userActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
        profile: {...payload.data.user},
        errors: ''
      };
    case userActionTypes.CREATE_USER_FAILURE:
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
