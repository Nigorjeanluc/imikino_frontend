import initialState from '../../initialStates';
import postReducer from './postReducer';

export default (state = initialState, action) => {
  const post = postReducer(state, action);

  return (
    post
    || state
  );
};
