import { locationActionTypes as locationTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

const getLocation = (id) => (dispatch) => dispatch(apiAction({
  method: 'get',
  httpOptions: { token: localStorage.token },
  url: `${LOCAL_URL}/admin/locations/${id}`,
  onStart: locationTypes.FETCH_LOCATION_START,
  onEnd: locationTypes.FETCH_LOCATION_END,
  onSuccess: locationTypes.FETCH_LOCATION_SUCCESS,
  onFailure: locationTypes.FETCH_LOCATION_FAILURE
}));

export default getLocation;
