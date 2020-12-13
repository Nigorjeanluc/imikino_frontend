import initialState from '../../initialStates';
import videosReducer from './videosReducer';

export default (state = initialState, action) => {
  const videos = videosReducer(state, action);

  return (
    videos
    || state
  );
};
