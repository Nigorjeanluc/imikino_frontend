import { goalsActionTypes as goalsTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllGoals = (page = 1, limit = 12) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/goals?page=${page}&limit=${limit}`,
  onStart: goalsTypes.FETCH_GOALS_START,
  onEnd: goalsTypes.FETCH_GOALS_END,
  onSuccess: goalsTypes.FETCH_GOALS_SUCCESS,
  onFailure: goalsTypes.FETCH_GOALS_FAILURE
}));

export default getAllGoals;
