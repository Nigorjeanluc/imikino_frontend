import openSocket from 'socket.io-client';
import { topScorerActionTypes as topScorerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const deleteTopScorer = (id) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createTopScorer');
  return dispatch(apiAction({
    method: 'delete',
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data'
    },
    url: `${BASIC_URL}/admin/top_scorers/${id}`,
    onStart: topScorerTypes.DELETE_TOP_SCORER_START,
    onEnd: topScorerTypes.DELETE_TOP_SCORER_END,
    onSuccess: topScorerTypes.DELETE_TOP_SCORER_SUCCESS,
    onFailure: topScorerTypes.DELETE_TOP_SCORER_FAILURE
  }));
};
