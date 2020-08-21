import { userActionTypes as userTypes } from '../../actionTypes';
import { apiAction, backendURLs } from '../../helpers';

export default (payload = {}) => (dispatch) => dispatch(apiAction({
  method: 'post',
  httpOptions: { token: localStorage.token },
  data: { ...payload },
  url: `${backendURLs.BASE_URL}/api/signin`,
  onStart: userTypes.LOGIN_USER_START,
  onEnd: userTypes.LOGIN_USER_END,
  onSuccess: userTypes.LOGIN_USER_SUCCESS,
  onFailure: userTypes.LOGIN_USER_FAILURE
}));
