import { tableActionTypes as tableTypes } from '../../actionTypes';
import table from '../../initialStates';

export default (state = table, { type, payload }) => {
  switch (type) {
    case tableTypes.FETCH_TABLE_START:
      return {
        ...state,
        loading: true,
        getTable: { ...state.getTable, message: '', loading: true, errors: '' }
      };
    case tableTypes.FETCH_TABLE_SUCCESS:
      return {
        ...state,
        listOfTables: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTable: {
          ...state.getTable,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case tableTypes.FETCH_TABLE_END:
      return {
        ...state,
        getTable: { ...state.getTable }
      };
    case tableTypes.FETCH_TABLE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getTable: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
