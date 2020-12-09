import openSocket from 'socket.io-client';
import { goalActionTypes as goalTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createGoal = (data) => (dispatch) => {
  const connectIO = openSocket(SOCKET_URL);
  connectIO.emit('createMatch');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/reporter/goals`,
    onStart: goalTypes.CREATE_GOAL_START,
    onEnd: goalTypes.CREATE_GOAL_END,
    onSuccess: goalTypes.CREATE_GOAL_SUCCESS,
    onFailure: goalTypes.CREATE_GOAL_FAILURE
  }));
};
