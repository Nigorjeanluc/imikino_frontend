import initialState from '../../initialStates';
import postsReducer from './postsReducer';
import headerReducer from './headerReducer';
import trendingReducer from './trendingReducer';
import transferReducer from './transferReducer';
import unapprovedReducer from './unapprovedReducer';

export default (state = initialState, action) => {
  const posts = postsReducer(state, action);
  const header = headerReducer(state, action);
  const trending = trendingReducer(state, action);
  const transfer = transferReducer(state, action);
  const unapproved = unapprovedReducer(state, action);

  return (
    posts
    || unapproved
    || transfer
    || trending
    || header
    || state
  );
};
