import initialState from '../../initialStates';
import fetchTableReducer from './fetchTableReducer';
import createTableReducer from './createTableReducer';
import editTableReducer from './editTableReducer';
import deleteTableReducer from './deleteTableReducer';

export default (state = initialState, action) => {
  const fetchTable = fetchTableReducer(state, action);
  const createTable = createTableReducer(state, action);
  const editTable = editTableReducer(state, action);
  const deleteTable = deleteTableReducer(state, action);

  return (
    fetchTable
    || createTable
    || editTable
    || deleteTable
    || state
  );
};
