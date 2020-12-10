import { userActionTypes as userTypes } from '../../actionTypes';
import { apiAction } from '../../helpers';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';

export default (payload = {}) => (dispatch) => dispatch(apiAction({
  method: 'post',
  httpOptions: { token: localStorage.token },
  data: { ...payload },
  url: `${BASIC_URL}/signin`,
  onStart: userTypes.LOGIN_USER_START,
  onEnd: userTypes.LOGIN_USER_END,
  onSuccess: userTypes.LOGIN_USER_SUCCESS,
  onFailure: userTypes.LOGIN_USER_FAILURE
}));
