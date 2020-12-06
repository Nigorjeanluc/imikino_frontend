import { tablesActionTypes as tablesTypes } from '../../actionTypes';
import tables from '../../initialStates';

export default (state = tables, { type, payload }) => {
  switch (type) {
    case tablesTypes.FETCH_TABLES_START:
      return {
        ...state,
        loading: true,
        getTables: { ...state.getTables, message: '', loading: true, errors: {} }
      };
    case tablesTypes.FETCH_TABLES_SUCCESS:
      return {
        ...state,
        listOfTables: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTables: {
          ...state.getTables,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case tablesTypes.FETCH_TABLES_FAILURE:
      return {
        ...state,
        getTables: { ...state.getTables, message: '', loading: false, errors: {} }
      };
    case tablesTypes.FETCH_TABLES_END:
      return {
        ...state,
        errors: payload.error,
        getTables: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
