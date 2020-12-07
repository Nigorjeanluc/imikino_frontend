import initialState from '../../initialStates';
import cardsReducer from './cardsReducer';

export default (state = initialState, action) => {
  const cards = cardsReducer(state, action);

  return (
    cards
    || state
  );
};
