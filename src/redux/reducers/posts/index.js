import initialState from '../../initialStates';
import postsReducer from './postsReducer';

export default (state = initialState, action) => {
  const posts = postsReducer(state, action);

  return (
    posts
    || state
  );
};
