import initialState from '../../initialStates';
import createLocationReducer from '../location/createLocationReducer';
import deleteLocationReducer from '../location/deleteLocationReducer';
import editLocationReducer from '../location/editLocationReducer';
import fetchLocationReducer from '../location/fetchLocationReducer';

export default (state = initialState, action) => {
  const createLocation = createLocationReducer(state, action);
  const deleteLocation = deleteLocationReducer(state, action);
  const editLocation = editLocationReducer(state, action);
  const fetchLocation = fetchLocationReducer(state, action);

  return (
    createLocation
    || deleteLocation
    || editLocation
    || fetchLocation
    || state
  );
};
