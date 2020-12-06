import initialState from '../../initialStates';
import postsReducer from './postsReducer';
import headerReducer from './headerReducer';
import trendingReducer from './trendingReducer';

export default (state = initialState, action) => {
  const posts = postsReducer(state, action);
  const header = headerReducer(state, action);
  const trending = trendingReducer(state, action);

  return (
    posts
    || trending
    || header
    || state
  );
};
