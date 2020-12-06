import { postActionTypes as postTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getSingle = (slug) => (dispatch) => dispatch(apiAction({
  method: 'get',
  // httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/news/${slug}`,
  onStart: postTypes.FETCH_POST_START,
  onEnd: postTypes.FETCH_POST_END,
  onSuccess: postTypes.FETCH_POST_SUCCESS,
  onFailure: postTypes.FETCH_POST_FAILURE
}));

export default getSingle;
