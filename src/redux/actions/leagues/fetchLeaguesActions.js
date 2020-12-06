import { leaguesActionTypes as leaguesTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllLeagues = (page, limit) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/leagues?page=${page}&limit=${limit}`,
  onStart: leaguesTypes.FETCH_LEAGUES_START,
  onEnd: leaguesTypes.FETCH_LEAGUES_END,
  onSuccess: leaguesTypes.FETCH_LEAGUES_SUCCESS,
  onFailure: leaguesTypes.FETCH_LEAGUES_FAILURE
}));

export default getAllLeagues;
