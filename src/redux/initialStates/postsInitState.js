const initState = {
  loading: false,
  message: '',
  listOfPosts: [],
  listOfHeader: [],
  listOfTrending: [],
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
  }
};

export default initState;
