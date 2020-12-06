import { leagueActionTypes as leagueTypes } from '../../actionTypes';
import league from '../../initialStates';

export default (state = league, { type, payload }) => {
  switch (type) {
    case leagueTypes.DELETE_LEAGUE_START:
      return {
        ...state,
        loading: true,
        getLeague: { ...state.getLeague, message: '', loading: true, errors: '' }
      };
    case leagueTypes.DELETE_LEAGUE_SUCCESS:
      return {
        ...state,
        league: {...payload.data},
        loading: false,
        getLeague: {
          ...state.getLeague,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case leagueTypes.DELETE_LEAGUE_END:
      return {
        ...state,
        getLeague: { ...state.getLeague }
      };
    case leagueTypes.DELETE_LEAGUE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getLeague: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
