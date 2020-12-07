import initialState from '../../initialStates';
import createCardReducer from './createCardReducer';
import deleteCardReducer from './deleteCardReducer';
import editCardReducer from './editCardReducer';
import fetchCardReducer from './fetchCardReducer';

export default (state = initialState, action) => {
  const createCard = createCardReducer(state, action);
  const deleteCard = deleteCardReducer(state, action);
  const editCard = editCardReducer(state, action);
  const fetchCard = fetchCardReducer(state, action);

  return (
    createCard
    || deleteCard
    || editCard
    || fetchCard
    || state
  );
};
