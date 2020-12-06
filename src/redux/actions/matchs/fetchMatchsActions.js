import { matchsActionTypes as matchsTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllMatchs = (page = 1, limit = 12) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/reporter/matchs?page=${page}&limit=${limit}`,
  onStart: matchsTypes.FETCH_MATCHS_START,
  onEnd: matchsTypes.FETCH_MATCHS_END,
  onSuccess: matchsTypes.FETCH_MATCHS_SUCCESS,
  onFailure: matchsTypes.FETCH_MATCHS_FAILURE
}));

export default getAllMatchs;
