import openSocket from 'socket.io-client';
import { commentActionTypes as commentTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createComment = (slug, data) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createComment');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
    },
    url: `${BASIC_URL}/user/${slug}/comments`,
    onStart: commentTypes.CREATE_COMMENT_START,
    onEnd: commentTypes.CREATE_COMMENT_END,
    onSuccess: commentTypes.CREATE_COMMENT_SUCCESS,
    onFailure: commentTypes.CREATE_COMMENT_FAILURE
  }));
};
