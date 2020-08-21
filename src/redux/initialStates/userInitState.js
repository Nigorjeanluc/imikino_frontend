const userInitialState = {
  token: '',
  login: {
    loading: false,
    user: {},
    message: '',
    errors: ''
  },
  logout: {
    loading: false,
    message: '',
    logoutErrors: {}
  },
  loading: false,
  message: '',
  user: {},
  errors: '',
  getUser: {
    loading: false,
    message: '',
    errors: ''
  },
};
export default userInitialState;
