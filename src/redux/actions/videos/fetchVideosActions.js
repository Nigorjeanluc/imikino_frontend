import { videosActionTypes as videosTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllVideos = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/videos?page=${page}&limit=${limit}`,
  onStart: videosTypes.FETCH_VIDEOS_START,
  onEnd: videosTypes.FETCH_VIDEOS_END,
  onSuccess: videosTypes.FETCH_VIDEOS_SUCCESS,
  onFailure: videosTypes.FETCH_VIDEOS_FAILURE
}));

export default getAllVideos;
