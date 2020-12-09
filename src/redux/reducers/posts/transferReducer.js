import { postsActionTypes as postsTypes } from '../../actionTypes';
import posts from '../../initialStates';

export default (state = posts, { type, payload }) => {
  switch (type) {
    case postsTypes.FETCH_TRANSFER_POSTS_START:
      return {
        ...state,
        loading: true,
        getTransfer: { ...state.getTransfer, message: '', loading: true, errors: {} }
      };
    case postsTypes.FETCH_TRANSFER_POSTS_SUCCESS:
      return {
        ...state,
        listOfTransfer: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTransfer: {
          ...state.getTransfer,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case postsTypes.FETCH_TRANSFER_POSTS_FAILURE:
      return {
        ...state,
        getTransfer: { ...state.getTransfer, message: '', loading: false, errors: {} }
      };
    case postsTypes.FETCH_TRANSFER_POSTS_END:
      return {
        ...state,
        errors: payload.error,
        getTransfer: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
