import { postsActionTypes as postsTypes } from '../../actionTypes';
import posts from '../../initialStates';

export default (state = posts, { type, payload }) => {
  switch (type) {
    case postsTypes.FETCH_UNAPPROVED_POSTS_START:
      return {
        ...state,
        loading: true,
        getUnapproved: { ...state.getUnapproved, message: '', loading: true, errors: {} }
      };
    case postsTypes.FETCH_UNAPPROVED_POSTS_SUCCESS:
      return {
        ...state,
        listOfUnapproved: [...payload.data.paginate],
        loading: false,
        getUnapproved: {
          ...state.getUnapproved,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case postsTypes.FETCH_UNAPPROVED_POSTS_FAILURE:
      return {
        ...state,
        getUnapproved: { ...state.getUnapproved, message: '', loading: false, errors: {} }
      };
    case postsTypes.FETCH_UNAPPROVED_POSTS_END:
      return {
        ...state,
        errors: payload.error,
        getUnapproved: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
