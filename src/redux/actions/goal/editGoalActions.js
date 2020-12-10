import { goalActionTypes as goalTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editGoal = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/goals/${id}`,
    onStart: goalTypes.UPDATE_GOAL_START,
    onEnd: goalTypes.UPDATE_GOAL_END,
    onSuccess: goalTypes.UPDATE_GOAL_SUCCESS,
    onFailure: goalTypes.UPDATE_GOAL_FAILURE
  }));
};
