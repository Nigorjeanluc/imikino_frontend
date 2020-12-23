import openSocket from 'socket.io-client';
import { topScorerActionTypes as topScorerTypes } from '../../actionTypes';
import { LOCAL_URL, BASIC_URL, SOCKET_URL, HEROKU_URL } from '../../helpers/backendURLs';
import { apiAction } from '../../helpers';

export const editTopScorer = (id, data, options) => (dispatch) => {
  const connectIO = openSocket(HEROKU_URL);
  connectIO.emit('createTopScorer');
  return dispatch(apiAction({
    method: 'patch',
    data,
    httpOptions: {
      token: localStorage.token,
      header: 'multipart/form-data',
      options
    },
    url: `${BASIC_URL}/admin/top_scorers/${id}`,
    onStart: topScorerTypes.UPDATE_TOP_SCORER_START,
    onEnd: topScorerTypes.UPDATE_TOP_SCORER_END,
    onSuccess: topScorerTypes.UPDATE_TOP_SCORER_SUCCESS,
    onFailure: topScorerTypes.UPDATE_TOP_SCORER_FAILURE
  }));
};
