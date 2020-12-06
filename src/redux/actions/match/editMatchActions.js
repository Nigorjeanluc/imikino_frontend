import { matchActionTypes as matchTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editMatch = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/reporter/matchs/${id}`,
    onStart: matchTypes.UPDATE_MATCH_START,
    onEnd: matchTypes.UPDATE_MATCH_END,
    onSuccess: matchTypes.UPDATE_MATCH_SUCCESS,
    onFailure: matchTypes.UPDATE_MATCH_FAILURE
  }));
};
