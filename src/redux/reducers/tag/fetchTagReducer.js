import { tagActionTypes as tagTypes } from '../../actionTypes';
import tag from '../../initialStates';

export default (state = tag, { type, payload }) => {
  switch (type) {
    case tagTypes.FETCH_TAG_START:
      return {
        ...state,
        loading: true,
        getTag: { ...state.getTag, message: '', loading: true, errors: '' }
      };
    case tagTypes.FETCH_TAG_SUCCESS:
      return {
        ...state,
        listOfTags: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTag: {
          ...state.getTag,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case tagTypes.FETCH_TAG_END:
      return {
        ...state,
        getTag: { ...state.getTag }
      };
    case tagTypes.FETCH_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getTag: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
