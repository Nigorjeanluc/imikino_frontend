import { sportsActionTypes as sportsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllSports = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/sports?page=${page}&limit=${limit}`,
  onStart: sportsTypes.FETCH_SPORTS_START,
  onEnd: sportsTypes.FETCH_SPORTS_END,
  onSuccess: sportsTypes.FETCH_SPORTS_SUCCESS,
  onFailure: sportsTypes.FETCH_SPORTS_FAILURE
}));

export default getAllSports;
