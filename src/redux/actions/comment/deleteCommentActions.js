import openSocket from 'socket.io-client';
import { commentActionTypes as commentTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteComment = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createComment');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token
    },
    url: `${BASIC_URL}/reporter/comments/${id}`,
    onStart: commentTypes.DELETE_COMMENT_START,
    onEnd: commentTypes.DELETE_COMMENT_END,
    onSuccess: commentTypes.DELETE_COMMENT_SUCCESS,
    onFailure: commentTypes.DELETE_COMMENT_FAILURE
  }));
};
