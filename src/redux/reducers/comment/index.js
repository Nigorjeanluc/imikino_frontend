import initialState from '../../initialStates';
import createCommentReducer from './createCommentReducer';
import deleteCommentReducer from './deleteCommentReducer';
import editCommentReducer from './editCommentReducer';
import fetchCommentReducer from './fetchCommentReducer';

export default (state = initialState, action) => {
  const createComment = createCommentReducer(state, action);
  const deleteComment = deleteCommentReducer(state, action);
  const editComment = editCommentReducer(state, action);
  const fetchComment = fetchCommentReducer(state, action);

  return (
    createComment
    || deleteComment
    || editComment
    || fetchComment
    || state
  );
};
