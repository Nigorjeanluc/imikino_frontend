import { leaguesActionTypes as leaguesTypes } from '../../actionTypes';
import leagues from '../../initialStates';

export default (state = leagues, { type, payload }) => {
  switch (type) {
    case leaguesTypes.FETCH_LEAGUES_START:
      return {
        ...state,
        loading: true,
        getLeagues: { ...state.getLeagues, message: '', loading: true, errors: {} }
      };
    case leaguesTypes.FETCH_LEAGUES_SUCCESS:
      return {
        ...state,
        listOfLeagues: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getLeagues: {
          ...state.getLeagues,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case leaguesTypes.FETCH_LEAGUES_FAILURE:
      return {
        ...state,
        getLeagues: { ...state.getLeagues, message: '', loading: false, errors: {} }
      };
    case leaguesTypes.FETCH_LEAGUES_END:
      return {
        ...state,
        errors: payload.error,
        getLeagues: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
