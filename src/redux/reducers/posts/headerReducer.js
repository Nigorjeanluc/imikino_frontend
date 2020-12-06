import { postsActionTypes as postsTypes } from '../../actionTypes';
import posts from '../../initialStates';

export default (state = posts, { type, payload }) => {
  switch (type) {
    case postsTypes.FETCH_HEADER_POSTS_START:
      return {
        ...state,
        loading: true,
        getHeader: { ...state.getHeader, message: '', loading: true, errors: {} }
      };
    case postsTypes.FETCH_HEADER_POSTS_SUCCESS:
      return {
        ...state,
        listOfHeader: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getHeader: {
          ...state.getHeader,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case postsTypes.FETCH_HEADER_POSTS_FAILURE:
      return {
        ...state,
        getHeader: { ...state.getHeader, message: '', loading: false, errors: {} }
      };
    case postsTypes.FETCH_HEADER_POSTS_END:
      return {
        ...state,
        errors: payload.error,
        getHeader: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
