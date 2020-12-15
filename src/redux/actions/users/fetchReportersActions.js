import { usersActionTypes as usersTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllReporters = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/users?page=${page}&limit=${limit}`,
  onStart: usersTypes.FETCH_USERS_START,
  onEnd: usersTypes.FETCH_USERS_END,
  onSuccess: usersTypes.FETCH_USERS_SUCCESS,
  onFailure: usersTypes.FETCH_USERS_FAILURE
}));

export default getAllReporters;
