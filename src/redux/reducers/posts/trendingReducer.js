import { postsActionTypes as postsTypes } from '../../actionTypes';
import posts from '../../initialStates';

export default (state = posts, { type, payload }) => {
  switch (type) {
    case postsTypes.FETCH_TRENDING_POSTS_START:
      return {
        ...state,
        loading: true,
        getTrending: { ...state.getTrending, message: '', loading: true, errors: {} }
      };
    case postsTypes.FETCH_TRENDING_POSTS_SUCCESS:
      return {
        ...state,
        listOfTrending: [...payload.data],
        loading: false,
        getTrending: {
          ...state.getTrending,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case postsTypes.FETCH_TRENDING_POSTS_FAILURE:
      return {
        ...state,
        getTrending: { ...state.getTrending, message: '', loading: false, errors: {} }
      };
    case postsTypes.FETCH_TRENDING_POSTS_END:
      return {
        ...state,
        errors: payload.error,
        getTrending: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
