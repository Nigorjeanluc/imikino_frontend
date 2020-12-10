import { userActionTypes as userTypes } from '../../actionTypes';
import { apiAction } from '../../helpers';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';

export default (payload = {}) => (dispatch) => dispatch(apiAction({
  method: 'post',
  httpOptions: { token: localStorage.token },
  data: { ...payload },
  url: `${BASIC_URL}/signup`,
  onStart: userTypes.SIGNUP_USER_START,
  onEnd: userTypes.SIGNUP_USER_END,
  onSuccess: userTypes.SIGNUP_USER_SUCCESS,
  onFailure: userTypes.SIGNUP_USER_FAILURE
}));
