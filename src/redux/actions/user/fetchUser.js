import { userActionTypes as userTypes } from '../../actionTypes';
import { apiAction } from '../../helpers';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';

export default () => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/user`,
  onStart: userTypes.FETCH_USER_START,
  onEnd: userTypes.FETCH_USER_END,
  onSuccess: userTypes.FETCH_USER_SUCCESS,
  onFailure: userTypes.FETCH_USER_FAILURE
}));
