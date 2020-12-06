import { teamActionTypes as teamTypes } from '../../actionTypes';
import team from '../../initialStates';

export default (state = team, { type, payload }) => {
  switch (type) {
    case teamTypes.FETCH_TEAM_START:
      return {
        ...state,
        loading: true,
        getTeam: { ...state.getTeam, message: '', loading: true, errors: '' }
      };
    case teamTypes.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        team: {...payload.data},
        loading: false,
        getTeam: {
          ...state.getTeam,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case teamTypes.FETCH_TEAM_END:
      return {
        ...state,
        getTeam: { ...state.getTeam }
      };
    case teamTypes.FETCH_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getTeam: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
