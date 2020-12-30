import { postActionTypes as postTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editPost = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/posts/${id}`,
    onStart: postTypes.UPDATE_POST_START,
    onEnd: postTypes.UPDATE_POST_END,
    onSuccess: postTypes.UPDATE_POST_SUCCESS,
    onFailure: postTypes.UPDATE_POST_FAILURE
  }));
};

export const editPostAdmin = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/posts/${id}`,
    onStart: postTypes.UPDATE_POST_START,
    onEnd: postTypes.UPDATE_POST_END,
    onSuccess: postTypes.UPDATE_POST_SUCCESS,
    onFailure: postTypes.UPDATE_POST_FAILURE
  }));
};
