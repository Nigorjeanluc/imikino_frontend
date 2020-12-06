import { postsActionTypes as postsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getHeaderPosts = (page = 1, limit = 6) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/news?page=${page}&limit=${limit}`,
  onStart: postsTypes.FETCH_HEADER_POSTS_START,
  onEnd: postsTypes.FETCH_HEADER_POSTS_END,
  onSuccess: postsTypes.FETCH_HEADER_POSTS_SUCCESS,
  onFailure: postsTypes.FETCH_HEADER_POSTS_FAILURE
}));

export default getHeaderPosts;
