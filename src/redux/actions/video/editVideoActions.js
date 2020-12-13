import openSocket from 'socket.io-client';
import { videoActionTypes as videoTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editVideo = (id, data, options) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createVideo');
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/videos/${id}`,
    onStart: videoTypes.UPDATE_VIDEO_START,
    onEnd: videoTypes.UPDATE_VIDEO_END,
    onSuccess: videoTypes.UPDATE_VIDEO_SUCCESS,
    onFailure: videoTypes.UPDATE_VIDEO_FAILURE
  }));
};
