import { locationActionTypes as locationTypes } from '../../actionTypes';
import location from '../../initialStates';

export default (state = location, { type, payload }) => {
  switch (type) {
    case locationTypes.DELETE_LOCATION_START:
      return {
        ...state,
        loading: true,
        getLocation: { ...state.getLocation, message: '', loading: true, errors: '' }
      };
    case locationTypes.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        location: {...payload.data},
        loading: false,
        getLocation: {
          ...state.getLocation,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case locationTypes.DELETE_LOCATION_END:
      return {
        ...state,
        getLocation: { ...state.getLocation }
      };
    case locationTypes.DELETE_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getLocation: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
