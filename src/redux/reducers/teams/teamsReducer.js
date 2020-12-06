import { teamsActionTypes as teamsTypes } from '../../actionTypes';
import teams from '../../initialStates';

export default (state = teams, { type, payload }) => {
  switch (type) {
    case teamsTypes.FETCH_TEAMS_START:
      return {
        ...state,
        loading: true,
        getTeams: { ...state.getTeams, message: '', loading: true, errors: {} }
      };
    case teamsTypes.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        listOfTeams: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getTeams: {
          ...state.getTeams,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case teamsTypes.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        getTeams: { ...state.getTeams, message: '', loading: false, errors: {} }
      };
    case teamsTypes.FETCH_TEAMS_END:
      return {
        ...state,
        errors: payload.error,
        getTeams: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
