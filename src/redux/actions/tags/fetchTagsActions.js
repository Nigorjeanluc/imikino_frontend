import { tagsActionTypes as tagsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllTags = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/tags?page=${page}&limit=${limit}`,
  onStart: tagsTypes.FETCH_TAGS_START,
  onEnd: tagsTypes.FETCH_TAGS_END,
  onSuccess: tagsTypes.FETCH_TAGS_SUCCESS,
  onFailure: tagsTypes.FETCH_TAGS_FAILURE
}));

export default getAllTags;
