import initialState from '../../initialStates';
import postsReducer from './postsReducer';
import headerReducer from './headerReducer';
import trendingReducer from './trendingReducer';
import transferReducer from './transferReducer';

export default (state = initialState, action) => {
  const posts = postsReducer(state, action);
  const header = headerReducer(state, action);
  const trending = trendingReducer(state, action);
  const transfer = transferReducer(state, action);

  return (
    posts
    || transfer
    || trending
    || header
    || state
  );
};
