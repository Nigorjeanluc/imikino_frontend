import initialState from '../../initialStates';
import tagsReducer from './tagsReducer';

export default (state = initialState, action) => {
  const tags = tagsReducer(state, action);

  return (
    tags
    || state
  );
};
