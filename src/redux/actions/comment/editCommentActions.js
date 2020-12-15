import { commentActionTypes as commentTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editComment = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/comments/${id}`,
    onStart: commentTypes.UPDATE_COMMENT_START,
    onEnd: commentTypes.UPDATE_COMMENT_END,
    onSuccess: commentTypes.UPDATE_COMMENT_SUCCESS,
    onFailure: commentTypes.UPDATE_COMMENT_FAILURE
  }));
};
