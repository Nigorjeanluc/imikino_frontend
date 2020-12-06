import { teamActionTypes as teamTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const createTeam = (data, options) => (dispatch) => {
  return dispatch(apiAction({
    method: 'post',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${LOCAL_URL}/admin/teams`,
    onStart: teamTypes.CREATE_TEAM_START,
    onEnd: teamTypes.CREATE_TEAM_END,
    onSuccess: teamTypes.CREATE_TEAM_SUCCESS,
    onFailure: teamTypes.CREATE_TEAM_FAILURE
  }));
};
