import openSocket from 'socket.io-client';
import { postActionTypes as postTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deletePost = (slug) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createPost');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/reporter/posts/${slug}`,
    onStart: postTypes.DELETE_POST_START,
    onEnd: postTypes.DELETE_POST_END,
    onSuccess: postTypes.DELETE_POST_SUCCESS,
    onFailure: postTypes.DELETE_POST_FAILURE
  }));
};
