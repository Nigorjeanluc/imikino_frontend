import { postsActionTypes as postsTypes } from '../../actionTypes';
import { BASE_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllPosts = (page = 1, limit = 6) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASE_URL}/news?page=${page}&limit=${limit}`,
  onStart: postsTypes.FETCH_POSTS_START,
  onEnd: postsTypes.FETCH_POSTS_END,
  onSuccess: postsTypes.FETCH_POSTS_SUCCESS,
  onFailure: postsTypes.FETCH_POSTS_FAILURE
}));

export default getAllPosts;
