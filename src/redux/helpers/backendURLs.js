const BASIC_URL = 'https://imikino-bn.herokuapp.com/api';
const HEROKU_URL = 'https://imikino-bn.herokuapp.com';
const LOCAL_URL = 'http://localhost:4005/api';
const SOCKET_URL = 'http://localhost:4005';
const LOCAL_URL_IMAGE = 'http://localhost:4005/uploads';
const IMIKINO_URL_IMAGE = 'https://imikino.rw/images'

// const LOCAL_URL = 'http://localhost:4000/api';
// const HEROKU_URL = 'http://localhost:4000';

const facebookAuth = `${LOCAL_URL}/auth/facebook`;
const googleAuth = `${LOCAL_URL}/auth/google`;
const LOGIN_URL = `${LOCAL_URL}/auth/signin`;
const LOGOUT_URL = `${LOCAL_URL}/auth/logout`;

export {
  LOCAL_URL,
  HEROKU_URL,
  BASIC_URL,
  facebookAuth,
  googleAuth,
  LOGIN_URL,
  LOGOUT_URL,
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
};
