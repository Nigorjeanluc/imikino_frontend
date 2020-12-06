import { tagsActionTypes as tagsTypes } from '../../actionTypes';
import tags from '../../initialStates';

export default (state = tags, { type, payload }) => {
  switch (type) {
    case tagsTypes.FETCH_TAGS_START:
      return {
        ...state,
        loading: true,
        getTags: { ...state.getTags, message: '', loading: true, errors: {} }
      };
    case tagsTypes.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        listOfTags: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTags: {
          ...state.getTags,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case tagsTypes.FETCH_TAGS_FAILURE:
      return {
        ...state,
        getTags: { ...state.getTags, message: '', loading: false, errors: {} }
      };
    case tagsTypes.FETCH_TAGS_END:
      return {
        ...state,
        errors: payload.error,
        getTags: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
