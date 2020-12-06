import initialState from '../../initialStates';
import commentsReducer from './commentsReducer';

export default (state = initialState, action) => {
  const comments = commentsReducer(state, action);

  return (
    comments
    || state
  );
};
