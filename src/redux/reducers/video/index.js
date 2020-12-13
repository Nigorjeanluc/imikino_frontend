import initialState from '../../initialStates';
import createVideoReducer from './createVideoReducer';
import editVideoReducer from './editVideoReducer';
import deleteVideoReducer from './deleteVideoReducer';
import fetchVideoReducer from './fetchVideoReducer';

export default (state = initialState, action) => {
  const createVideo = createVideoReducer(state, action);
  const editVideo = editVideoReducer(state, action);
  const deleteVideo = deleteVideoReducer(state, action);
  const fetchVideo = fetchVideoReducer(state, action);

  return (
    createVideo
    || editVideo
    || deleteVideo
    || fetchVideo
    || state
  );
};
