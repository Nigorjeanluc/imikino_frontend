import { commentsActionTypes as commentsTypes } from '../../actionTypes';
import comments from '../../initialStates';

export default (state = comments, { type, payload }) => {
  switch (type) {
    case commentsTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        loading: true,
        getComments: { ...state.getComments, message: '', loading: true, errors: {} }
      };
    case commentsTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        listOfComments: [...payload.data.paginate],
        loading: false,
        getComments: {
          ...state.getComments,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case commentsTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        getComments: { ...state.getComments, message: '', loading: false, errors: {} }
      };
    case commentsTypes.FETCH_COMMENTS_END:
      return {
        ...state,
        errors: payload.error,
        getComments: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
