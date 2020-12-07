import initialState from '../../initialStates';
import createGoalReducer from './createGoalReducer';
import deleteGoalReducer from './deleteGoalReducer';
import editGoalReducer from './editGoalReducer';
import fetchGoalReducer from './fetchGoalReducer';

export default (state = initialState, action) => {
  const createGoal = createGoalReducer(state, action);
  const deleteGoal = deleteGoalReducer(state, action);
  const editGoal = editGoalReducer(state, action);
  const fetchGoal = fetchGoalReducer(state, action);

  return (
    createGoal
    || deleteGoal
    || editGoal
    || fetchGoal
    || state
  );
};
