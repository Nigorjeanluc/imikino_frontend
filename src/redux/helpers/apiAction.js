import { apiActionTypes } from '../actionTypes';

export default ({
  url = '',
  method = 'GET',
  data = null,
  httpOptions = {},
  onStart = apiActionTypes.API_REQUEST_START,
  onEnd = apiActionTypes.API_REQUEST_END,
  onSuccess = apiActionTypes.API_REQUEST_SUCCESS,
  onFailure = apiActionTypes.API_REQUEST_FAILURE,
  label = ''
}) => ({
  type: apiActionTypes.API_REQUEST,
  payload: {
    url,
    method,
    data,
    httpOptions,
    onSuccess,
    onFailure,
    onStart,
    onEnd,
    label
  }
});
