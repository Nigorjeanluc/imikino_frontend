import { playerActionTypes as playerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getPlayer = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/players/${id}`,
  onStart: playerTypes.FETCH_PLAYER_START,
  onEnd: playerTypes.FETCH_PLAYER_END,
  onSuccess: playerTypes.FETCH_PLAYER_SUCCESS,
  onFailure: playerTypes.FETCH_PLAYER_FAILURE
}));

export default getPlayer;
