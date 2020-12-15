import initialState from '../../initialStates';
import reportersReducer from './reportersReducer';

export default (state = initialState, action) => {
  const reporters = reportersReducer(state, action);

  return (
    reporters
    || state
  );
};
