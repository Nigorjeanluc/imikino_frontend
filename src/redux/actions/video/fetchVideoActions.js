import { videoActionTypes as videoTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getVideo = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/videos/${id}`,
  onStart: videoTypes.FETCH_VIDEO_START,
  onEnd: videoTypes.FETCH_VIDEO_END,
  onSuccess: videoTypes.FETCH_VIDEO_SUCCESS,
  onFailure: videoTypes.FETCH_VIDEO_FAILURE
}));

export default getVideo;
