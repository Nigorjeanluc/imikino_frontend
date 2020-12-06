import { postActionTypes as postTypes } from '../../actionTypes';
import post from '../../initialStates';

export default (state = post, { type, payload }) => {
  switch (type) {
    case postTypes.FETCH_POST_START:
      return {
        ...state,
        loading: true,
        getPost: { ...state.getPost, message: '', loading: true, errors: {} }
      };
    case postTypes.FETCH_POST_SUCCESS:
      console.log(payload, "Payload");
      return {
        ...state,
        post: {...payload.data},
        loading: false,
        getPost: {
          ...state.getPost,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case postTypes.FETCH_POST_END:
      console.log(state, "State");
      return {
        ...state,
        getPost: { ...state.getPost }
      };
    case postTypes.FETCH_POST_FAILURE:
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
