const initState = {
  loading: false,
  message: '',
  listOfPosts: [],
  listOfHeader: [],
  listOfTrending: [],
  listOfTransfer: [],
  Next: {},
  Previous: {},
  errors: {},
  getPosts: {
    loading: false,
    message: '',
    errors: {}
  },
  getHeader: {
    loading: false,
    message: '',
    errors: {}
  },
  getTrending: {
    loading: false,
    message: '',
    errors: {}
  },
  getTransfer: {
    loading: false,
    message: '',
    errors: {}
  }
};

export default initState;
