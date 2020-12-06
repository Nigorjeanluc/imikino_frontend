import { userActionTypes } from '../../actionTypes';
import { apiAction, backendURLs } from '../../helpers';

export default (payload = {}) => dispatch => dispatch(apiAction({
  method: 'post',
  url: `${backendURLs.LOCAL_URL}/logout`,
  data: { ...payload },
  onStart: userActionTypes.LOGOUT_USER_START,
  onEnd: userActionTypes.LOGOUT_USER_END,
  onSuccess: userActionTypes.LOGOUT_USER_SUCCESS,
  onFailure: userActionTypes.LOGOUT_USER_FAILURE
}));
