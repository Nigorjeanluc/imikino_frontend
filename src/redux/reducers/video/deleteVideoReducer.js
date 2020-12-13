import { videoActionTypes as videoTypes } from '../../actionTypes';
import video from '../../initialStates';

export default (state = video, { type, payload }) => {
  switch (type) {
    case videoTypes.DELETE_VIDEO_START:
      return {
        ...state,
        loading: true,
        getVideo: { ...state.getVideo, message: '', loading: true, errors: '' }
      };
    case videoTypes.DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        video: {...payload.data},
        loading: false,
        getVideo: {
          ...state.getVideo,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case videoTypes.DELETE_VIDEO_END:
      return {
        ...state,
        getVideo: { ...state.getVideo }
      };
    case videoTypes.DELETE_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getVideo: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
