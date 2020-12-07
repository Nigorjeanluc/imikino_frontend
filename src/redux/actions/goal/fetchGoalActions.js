import { goalActionTypes as goalTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingleGoal = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/goals/${id}`,
  onStart: goalTypes.FETCH_GOAL_START,
  onEnd: goalTypes.FETCH_GOAL_END,
  onSuccess: goalTypes.FETCH_GOAL_SUCCESS,
  onFailure: goalTypes.FETCH_GOAL_FAILURE
}));

export default getSingleGoal;
