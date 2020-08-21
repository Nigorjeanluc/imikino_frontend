const BASE_URL = 'https://imikino-bn.herokuapp.com/api';
const HEROKU_URL = 'https://imikino-bn.herokuapp.com';
const LOCAL_URL = 'http://localhost:4005/api';

// const BASE_URL = 'http://localhost:4000/api';
// const HEROKU_URL = 'http://localhost:4000';

const facebookAuth = `${BASE_URL}/auth/facebook`;
const googleAuth = `${BASE_URL}/auth/google`;
const LOGIN_URL = `${BASE_URL}/auth/signin`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;

export {
  BASE_URL,
  HEROKU_URL,
  LOCAL_URL,
  facebookAuth,
  googleAuth,
  LOGIN_URL,
  LOGOUT_URL,
};
