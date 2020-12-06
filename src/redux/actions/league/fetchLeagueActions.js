import { leagueActionTypes as leagueTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const fetchLeague = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/leagues/${id}`,
  onStart: leagueTypes.FETCH_LEAGUE_START,
  onEnd: leagueTypes.FETCH_LEAGUE_END,
  onSuccess: leagueTypes.FETCH_LEAGUE_SUCCESS,
  onFailure: leagueTypes.FETCH_LEAGUE_FAILURE
}));

export default fetchLeague;
