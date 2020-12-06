import { playerActionTypes as playerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editPlayer = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${LOCAL_URL}/admin/players/${id}`,
    onStart: playerTypes.UPDATE_PLAYER_START,
    onEnd: playerTypes.UPDATE_PLAYER_END,
    onSuccess: playerTypes.UPDATE_PLAYER_SUCCESS,
    onFailure: playerTypes.UPDATE_PLAYER_FAILURE
  }));
};
