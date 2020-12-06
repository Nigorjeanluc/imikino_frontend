import { tablesActionTypes as tablesTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllTables = ( league_id ,page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/tables/${league_id}?page=${page}&limit=${limit}`,
  onStart: tablesTypes.FETCH_TABLES_START,
  onEnd: tablesTypes.FETCH_TABLES_END,
  onSuccess: tablesTypes.FETCH_TABLES_SUCCESS,
  onFailure: tablesTypes.FETCH_TABLES_FAILURE
}));

export default getAllTables;
