import { sportActionTypes as sportTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const fetchSport = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/sports/${id}`,
  onStart: sportTypes.FETCH_SPORT_START,
  onEnd: sportTypes.FETCH_SPORT_END,
  onSuccess: sportTypes.FETCH_SPORT_SUCCESS,
  onFailure: sportTypes.FETCH_SPORT_FAILURE
}));

export default fetchSport;
