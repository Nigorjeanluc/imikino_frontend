const BASIC_URL = 'https://imikino-fullstack-nyanu.ondigitalocean.app/api';
const HEROKU_URL = 'https://imikino-fullstack-nyanu.ondigitalocean.app';
const LOCAL_URL = 'http://localhost:4005/api';
const SOCKET_URL = 'http://localhost:4005';
const LOCAL_URL_IMAGE = 'http://localhost:4005/uploads';
const IMIKINO_URL_IMAGE = 'https://imikino.rw/images';
const BACKEND_URL_IMAGE = 'https://imikino.fra1.digitaloceanspaces.com';
const FRONTEND = 'https://imikino.rw';

// const LOCAL_URL = 'http://localhost:4000/api';
// const HEROKU_URL = 'http://localhost:4000';

const facebookAuth = `${BASIC_URL}/auth/facebook`;
const googleAuth = `${BASIC_URL}/auth/google`;
const LOGIN_URL = `${BASIC_URL}/auth/signin`;
const LOGOUT_URL = `${BASIC_URL}/auth/logout`;

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
  BACKEND_URL_IMAGE,
  FRONTEND
};
