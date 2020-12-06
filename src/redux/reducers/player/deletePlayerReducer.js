import { playerActionTypes as playerTypes } from '../../actionTypes';
import player from '../../initialStates';

export default (state = player, { type, payload }) => {
  switch (type) {
    case playerTypes.DELETE_PLAYER_START:
      return {
        ...state,
        loading: true,
        getPlayer: { ...state.getPlayer, message: '', loading: true, errors: '' }
      };
    case playerTypes.DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        player: {...payload.data},
        loading: false,
        getPlayer: {
          ...state.getPlayer,
          loading: false,
          message: payload.message,
          errors: ''
        }
      };
    case playerTypes.DELETE_PLAYER_END:
      return {
        ...state,
        getPlayer: { ...state.getPlayer }
      };
    case playerTypes.DELETE_PLAYER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload.error,
        getPlayer: {
          loading: false,
          message: '',
          errors: payload.error
        }
      };
    default:
      return null;
  }
};
