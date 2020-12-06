import { locationsActionTypes as locationsTypes } from '../../actionTypes';
import locations from '../../initialStates';

export default (state = locations, { type, payload }) => {
  switch (type) {
    case locationsTypes.FETCH_LOCATIONS_START:
      return {
        ...state,
        loading: true,
        getLocations: { ...state.getLocations, message: '', loading: true, errors: {} }
      };
    case locationsTypes.FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        listOfLocations: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getLocations: {
          ...state.getLocations,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case locationsTypes.FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        getLocations: { ...state.getLocations, message: '', loading: false, errors: {} }
      };
    case locationsTypes.FETCH_LOCATIONS_END:
      return {
        ...state,
        errors: payload.error,
        getLocations: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
