import { videosActionTypes as videosTypes } from '../../actionTypes';
import videos from '../../initialStates';

export default (state = videos, { type, payload }) => {
  switch (type) {
    case videosTypes.FETCH_VIDEOS_START:
      return {
        ...state,
        loading: true,
        getVideos: { ...state.getVideos, message: '', loading: true, errors: {} }
      };
    case videosTypes.FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        listOfVideos: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getVideos: {
          ...state.getVideos,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case videosTypes.FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        getVideos: { ...state.getVideos, message: '', loading: false, errors: {} }
      };
    case videosTypes.FETCH_VIDEOS_END:
      return {
        ...state,
        errors: payload.error,
        getVideos: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
