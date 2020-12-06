import { postsActionTypes as postsTypes } from '../../actionTypes';
import posts from '../../initialStates';

export default (state = posts, { type, payload }) => {
  switch (type) {
    case postsTypes.FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
        getPosts: { ...state.getPosts, message: '', loading: true, errors: {} }
      };
    case postsTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        listOfPosts: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getPosts: {
          ...state.getPosts,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case postsTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        getPosts: { ...state.getPosts, message: '', loading: false, errors: {} }
      };
    case postsTypes.FETCH_POSTS_END:
      return {
        ...state,
        errors: payload.error,
        getPosts: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
