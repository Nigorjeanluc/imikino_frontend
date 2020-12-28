import initialState from '../../initialStates';
import postReducer from './postReducer';
import approveReducer from './approvePostReducer';
import editReducer from './editPostReducer';
import deleteReducer from './deletePostReducer';
import createReducer from './createPostReducer';

export default (state = initialState, action) => {
  const post = postReducer(state, action);
  const approve = approveReducer(state, action);
  const edit = editReducer(state, action);
  const destroy = deleteReducer(state, action);
  const create = createReducer(state, action);


  return (
    post
    || approve
    || edit
    || destroy
    || create
    || state
  );
};
