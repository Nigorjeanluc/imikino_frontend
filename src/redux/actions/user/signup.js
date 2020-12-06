import { userActionTypes as userTypes } from '../../actionTypes';
import { apiAction, backendURLs } from '../../helpers';

export default (payload = {}) => (dispatch) => dispatch(apiAction({
  method: 'post',
  httpOptions: { token: localStorage.token },
  data: { ...payload },
  url: `${backendURLs.LOCAL_URL}/signup`,
  onStart: userTypes.SIGNUP_USER_START,
  onEnd: userTypes.SIGNUP_USER_END,
  onSuccess: userTypes.SIGNUP_USER_SUCCESS,
  onFailure: userTypes.SIGNUP_USER_FAILURE
}));
