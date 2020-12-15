import { commentActionTypes as commentTypes } from '../../actionTypes';
import comment from '../../initialStates';

export default (state = comment, { type, payload }) => {
  switch (type) {
    case commentTypes.UPDATE_COMMENT_START:
      return {
        ...state,
        loading: true,
        getComment: { ...state.getComment, message: '', loading: true, errors: '' }
      };
    case commentTypes.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: {...payload.data},
        loading: false,
        getComment: {
          ...state.getComment,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case commentTypes.UPDATE_COMMENT_END:
      return {
        ...state,
        getComment: { ...state.getComment }
      };
    case commentTypes.UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getComment: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
