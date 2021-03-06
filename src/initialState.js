export const initialState = {
  user: {
    isAuthenticated: false,
    loggingIn: false,
    signup: {
      usernameError: ''
    },
    login: {
      error: ''
    },
    username: '',
    id: '',
    ip: ''
  },
  polls: {
    status: 'loading',
    items: []
  }
};