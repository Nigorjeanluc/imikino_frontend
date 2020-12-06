import initialState from '../../initialStates';
import fetchTagReducer from './fetchTagReducer';

export default (state = initialState, action) => {
  const fetchTag = fetchTagReducer(state, action);

  return (
    fetchTag
    || state
  );
};
