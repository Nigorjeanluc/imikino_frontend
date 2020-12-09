import { postsActionTypes as postsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getTransferPosts = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/transfer?page=${page}&limit=${limit}`,
  onStart: postsTypes.FETCH_TRANSFER_POSTS_START,
  onEnd: postsTypes.FETCH_TRANSFER_POSTS_END,
  onSuccess: postsTypes.FETCH_TRANSFER_POSTS_SUCCESS,
  onFailure: postsTypes.FETCH_TRANSFER_POSTS_FAILURE
}));

export default getTransferPosts;
