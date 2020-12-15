import { commentActionTypes as commentTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingleComment = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/reporter/comments/${id}`,
  onStart: commentTypes.FETCH_COMMENT_START,
  onEnd: commentTypes.FETCH_COMMENT_END,
  onSuccess: commentTypes.FETCH_COMMENT_SUCCESS,
  onFailure: commentTypes.FETCH_COMMENT_FAILURE
}));

export default getSingleComment;
