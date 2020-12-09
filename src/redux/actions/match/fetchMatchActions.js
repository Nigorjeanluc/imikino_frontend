import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingleMatch = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/matchs/${id}`,
  onStart: matchTypes.FETCH_MATCH_START,
  onEnd: matchTypes.FETCH_MATCH_END,
  onSuccess: matchTypes.FETCH_MATCH_SUCCESS,
  onFailure: matchTypes.FETCH_MATCH_FAILURE
}));

export default getSingleMatch;
