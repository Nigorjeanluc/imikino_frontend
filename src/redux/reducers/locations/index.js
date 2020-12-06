import initialState from '../../initialStates';
import locationsReducer from './locationsReducer';

export default (state = initialState, action) => {
  const locations = locationsReducer(state, action);

  return (
    locations
    || state
  );
};
