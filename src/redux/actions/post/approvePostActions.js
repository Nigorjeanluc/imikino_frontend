import openSocket from 'socket.io-client';
import { postActionTypes as postTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const approvePost = (slug) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createPost');
  return dispatch(apiAction({
    method: 'patch',
    httpOptions: { token: localStorage.token },
    url: `${BASIC_URL}/admin/approve/${slug}`,
    onStart: postTypes.APPROVE_POST_START,
    onEnd: postTypes.APPROVE_POST_END,
    onSuccess: postTypes.APPROVE_POST_SUCCESS,
    onFailure: postTypes.APPROVE_POST_FAILURE
  }));
};

export default approvePost;
