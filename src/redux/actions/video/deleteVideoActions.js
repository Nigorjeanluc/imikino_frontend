import openSocket from 'socket.io-client';
import { videoActionTypes as videoTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteVideo = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createVideo');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/admin/videos/${id}`,
    onStart: videoTypes.DELETE_VIDEO_START,
    onEnd: videoTypes.DELETE_VIDEO_END,
    onSuccess: videoTypes.DELETE_VIDEO_SUCCESS,
    onFailure: videoTypes.DELETE_VIDEO_FAILURE
  }));
};
