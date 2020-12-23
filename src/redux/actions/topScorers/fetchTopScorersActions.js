import { topScorersActionTypes as topScorersTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllTopScorers = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/top_scorers?page=${page}&limit=${limit}`,
  onStart: topScorersTypes.FETCH_TOP_SCORERS_START,
  onEnd: topScorersTypes.FETCH_TOP_SCORERS_END,
  onSuccess: topScorersTypes.FETCH_TOP_SCORERS_SUCCESS,
  onFailure: topScorersTypes.FETCH_TOP_SCORERS_FAILURE
}));

export default getAllTopScorers;
