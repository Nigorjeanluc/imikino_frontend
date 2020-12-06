import { tagActionTypes as tagTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const fetchTag = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/tags/${id}`,
  onStart: tagTypes.FETCH_TAG_START,
  onEnd: tagTypes.FETCH_TAG_END,
  onSuccess: tagTypes.FETCH_TAG_SUCCESS,
  onFailure: tagTypes.FETCH_TAG_FAILURE
}));

export default fetchTag;
