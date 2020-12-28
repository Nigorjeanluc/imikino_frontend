import { postsActionTypes as postsTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getUnapprovedPosts = (page = 1, limit = 12) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/unapproved?page=${page}&limit=${limit}`,
  onStart: postsTypes.FETCH_UNAPPROVED_POSTS_START,
  onEnd: postsTypes.FETCH_UNAPPROVED_POSTS_END,
  onSuccess: postsTypes.FETCH_UNAPPROVED_POSTS_SUCCESS,
  onFailure: postsTypes.FETCH_UNAPPROVED_POSTS_FAILURE
}));

export default getUnapprovedPosts;
