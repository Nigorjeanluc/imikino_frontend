import { topScorerActionTypes as topScorerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getTopScorer = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/top_scorers/${id}`,
  onStart: topScorerTypes.FETCH_TOP_SCORER_START,
  onEnd: topScorerTypes.FETCH_TOP_SCORER_END,
  onSuccess: topScorerTypes.FETCH_TOP_SCORER_SUCCESS,
  onFailure: topScorerTypes.FETCH_TOP_SCORER_FAILURE
}));

export default getTopScorer;
