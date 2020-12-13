import openSocket from 'socket.io-client';
import { videoActionTypes as videoTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createVideo = (data) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createVideo');
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token
    },
    url: `${BASIC_URL}/admin/videos`,
    onStart: videoTypes.CREATE_VIDEO_START,
    onEnd: videoTypes.CREATE_VIDEO_END,
    onSuccess: videoTypes.CREATE_VIDEO_SUCCESS,
    onFailure: videoTypes.CREATE_VIDEO_FAILURE
  }));
};
