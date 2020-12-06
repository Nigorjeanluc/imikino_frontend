import { locationsActionTypes as locationsTypes } from '../../actionTypes';
import { BASIC_URL, LOCAL_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getAllLocations = (page = 1, limit = 10) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${BASIC_URL}/admin/locations?page=${page}&limit=${limit}`,
  onStart: locationsTypes.FETCH_LOCATIONS_START,
  onEnd: locationsTypes.FETCH_LOCATIONS_END,
  onSuccess: locationsTypes.FETCH_LOCATIONS_SUCCESS,
  onFailure: locationsTypes.FETCH_LOCATIONS_FAILURE
}));

export default getAllLocations;
