import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingleMatch = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/matchs/${id}`,
  onStart: matchTypes.FETCH_POST_START,
  onEnd: matchTypes.FETCH_POST_END,
  onSuccess: matchTypes.FETCH_POST_SUCCESS,
  onFailure: matchTypes.FETCH_POST_FAILURE
}));

export default getSingleMatch;
