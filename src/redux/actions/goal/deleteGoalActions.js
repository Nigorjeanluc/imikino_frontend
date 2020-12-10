import openSocket from 'socket.io-client';
import { goalActionTypes as goalTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteGoal = (slug) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/reporter/goals/${slug}`,
    onStart: goalTypes.DELETE_GOAL_START,
    onEnd: goalTypes.DELETE_GOAL_END,
    onSuccess: goalTypes.DELETE_GOAL_SUCCESS,
    onFailure: goalTypes.DELETE_GOAL_FAILURE
  }));
};
