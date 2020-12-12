const userInitialState = {
  token: '',
  login: {
    loading: false,
    user: {},
    message: '',
    errors: ''
  },
  signup: {
    loading: false,
    user: {},
    message: '',
    errors: ''
  },
  logout: {
    loading: false,
    message: '',
    errors: ''
  },
  loading: false,
  message: '',
  profile: {},
  errors: '',
  getUser: {
    loading: false,
    message: '',
    errors: ''
  },
};
export default userInitialState;
