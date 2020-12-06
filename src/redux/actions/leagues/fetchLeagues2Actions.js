import { leaguesActionTypes as leaguesTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllLeagues2 = (page, limit) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/leagues?page=${page}&limit=${limit}`,
  onStart: leaguesTypes.FETCH_LEAGUES_START,
  onEnd: leaguesTypes.FETCH_LEAGUES_END,
  onSuccess: leaguesTypes.FETCH_LEAGUES_SUCCESS,
  onFailure: leaguesTypes.FETCH_LEAGUES_FAILURE
}));

export default getAllLeagues2;
