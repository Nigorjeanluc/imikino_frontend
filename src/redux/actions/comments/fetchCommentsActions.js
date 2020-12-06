import { commentsActionTypes as commentsTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getPostComments = (slug) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/news/${slug}/comments`,
  onStart: commentsTypes.FETCH_COMMENTS_START,
  onEnd: commentsTypes.FETCH_COMMENTS_END,
  onSuccess: commentsTypes.FETCH_COMMENTS_SUCCESS,
  onFailure: commentsTypes.FETCH_COMMENTS_FAILURE
}));

export default getPostComments;
