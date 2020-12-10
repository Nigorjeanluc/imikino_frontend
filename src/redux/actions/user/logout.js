import { userActionTypes } from '../../actionTypes';
import { apiAction } from '../../helpers';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';

export default (payload = {}) => dispatch => dispatch(apiAction({
  method: 'post',
  url: `${BASIC_URL}/logout`,
  data: { ...payload },
  onStart: userActionTypes.LOGOUT_USER_START,
  onEnd: userActionTypes.LOGOUT_USER_END,
  onSuccess: userActionTypes.LOGOUT_USER_SUCCESS,
  onFailure: userActionTypes.LOGOUT_USER_FAILURE
}));
