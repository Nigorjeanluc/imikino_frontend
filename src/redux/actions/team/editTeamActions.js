import { teamActionTypes as teamTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editTeam = (id, data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${LOCAL_URL}/admin/teams/${id}`,
    onStart: teamTypes.UPDATE_TEAM_START,
    onEnd: teamTypes.UPDATE_TEAM_END,
    onSuccess: teamTypes.UPDATE_TEAM_SUCCESS,
    onFailure: teamTypes.UPDATE_TEAM_FAILURE
  }));
};
