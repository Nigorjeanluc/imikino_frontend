import { tableActionTypes as tableTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const fetchTable = (league_id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/tables/${league_id}`,
  onStart: tableTypes.FETCH_TABLE_START,
  onEnd: tableTypes.FETCH_TABLE_END,
  onSuccess: tableTypes.FETCH_TABLE_SUCCESS,
  onFailure: tableTypes.FETCH_TABLE_FAILURE
}));

export default fetchTable;
