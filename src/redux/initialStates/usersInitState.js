const initState = {
  loading: false,
  message: '',
  listOfUsers: [],
  listOfReporters: [],
  listOfAdmins: [],
  Next: {},
  Previous: {},
  errors: {},
  getUsers: {
    loading: false,
    message: '',
    errors: {}
  },
  getReporters: {
    loading: false,
    message: '',
    errors: {}
  },
  getAdmins: {
    loading: false,
    message: '',
    errors: {}
  }
};

export default initState;
