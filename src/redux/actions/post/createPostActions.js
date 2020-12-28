import openSocket from 'socket.io-client';
import { postActionTypes as postTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createPost = (data, options) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createPost');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/posts`,
    onStart: postTypes.CREATE_POST_START,
    onEnd: postTypes.CREATE_POST_END,
    onSuccess: postTypes.CREATE_POST_SUCCESS,
    onFailure: postTypes.CREATE_POST_FAILURE
  }));
};
