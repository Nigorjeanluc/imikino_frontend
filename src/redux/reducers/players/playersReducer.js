import { playersActionTypes as playersTypes } from '../../actionTypes';
import players from '../../initialStates';

export default (state = players, { type, payload }) => {
  switch (type) {
    case playersTypes.FETCH_PLAYERS_START:
      return {
        ...state,
        loading: true,
        getPlayers: { ...state.getPlayers, message: '', loading: true, errors: {} }
      };
    case playersTypes.FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        listOfPlayers: [...payload.data.paginate],
        loading: false,
        Next: { ...payload.data.Next },
        Previous: { ...payload.data.Previous },
        getPlayers: {
          ...state.getPlayers,
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case playersTypes.FETCH_PLAYERS_FAILURE:
      return {
        ...state,
        getPlayers: { ...state.getPlayers, message: '', loading: false, errors: {} }
      };
    case playersTypes.FETCH_PLAYERS_END:
      return {
        ...state,
        errors: payload.error,
        getPlayers: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
