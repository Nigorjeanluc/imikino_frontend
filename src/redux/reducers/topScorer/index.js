import initialState from '../../initialStates';
import createTopScorerReducer from './createTopScorerReducer';
import editTopScorerReducer from './editTopScorerReducer';
import deleteTopScorerReducer from './deleteTopScorerReducer';
import fetchTopScorerReducer from './fetchTopScorerReducer';

export default (state = initialState, action) => {
  const createTopScorer = createTopScorerReducer(state, action);
  const editTopScorer = editTopScorerReducer(state, action);
  const deleteTopScorer = deleteTopScorerReducer(state, action);
  const fetchTopScorer = fetchTopScorerReducer(state, action);

  return (
    createTopScorer
    || editTopScorer
    || deleteTopScorer
    || fetchTopScorer
    || state
  );
};
