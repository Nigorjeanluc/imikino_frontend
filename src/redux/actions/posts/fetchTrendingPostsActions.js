import { postsActionTypes as postsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getTrendingPosts = () => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/trending`,
  onStart: postsTypes.FETCH_TRENDING_POSTS_START,
  onEnd: postsTypes.FETCH_TRENDING_POSTS_END,
  onSuccess: postsTypes.FETCH_TRENDING_POSTS_SUCCESS,
  onFailure: postsTypes.FETCH_TRENDING_POSTS_FAILURE
}));

export default getTrendingPosts;
