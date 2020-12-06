import { playersActionTypes as playersTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllPlayers = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/players?page=${page}&limit=${limit}`,
  onStart: playersTypes.FETCH_PLAYERS_START,
  onEnd: playersTypes.FETCH_PLAYERS_END,
  onSuccess: playersTypes.FETCH_PLAYERS_SUCCESS,
  onFailure: playersTypes.FETCH_PLAYERS_FAILURE
}));

export default getAllPlayers;
