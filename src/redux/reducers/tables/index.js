import initialState from '../../initialStates';
import tablesReducer from './tablesReducer';

export default (state = initialState, action) => {
  const tables = tablesReducer(state, action);

  return (
    tables
    || state
  );
};
