import { postActionTypes as postTypes } from '../../actionTypes';
import post from '../../initialStates';

export default (state = post, { type, payload }) => {
  switch (type) {
    case postTypes.INCREMENT_POST_START:
      return {
        ...state,
        // loading: true,
        getPost: { ...state.getPost, message: '', loading: true, errors: {} }
      };
    case postTypes.INCREMENT_POST_SUCCESS:
      return {
        ...state,
        // post: {...payload.data},
        loading: false,
        getPost: {
          ...state.getPost,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case postTypes.INCREMENT_POST_END:
      return {
        ...state,
        getPost: { ...state.getPost }
      };
    case postTypes.INCREMENT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        getPost: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
