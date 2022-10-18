import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
  currentUser: {},
  token:'',
  isAuthenticated: false,
  error: '',
  loading: true,
  
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, {payload}) => {
      state.loading = true
    },
    register: (state, {payload}) => {
        state.loading = true
      },

    loginSuccess: (state, { payload }) => {
      state.currentUser = payload.user
      state.token=payload.token;
      state.isAuthenticated = true
      state.loading = false
      console.log("Login Success -Slice")
    },
    registerSuccess: (state, { payload }) => {
        state.currentUser = payload.user
        state.token=payload.token;
        state.isAuthenticated = true
        state.loading = false
        console.log(state.currentUser)
      },

    loginError: (state, { payload }) => {
      state.error = payload
      state.isAuthenticated = false
      state.loading = false
    },

    logout: (state, {payload}) => {
      state.loading = true
      console.log('log out redux')
    },

    logoutSuccess: (state) => {
        console.log('log out success')
        console.log(state.isAuthenticated)
      state.isAuthenticated = false
      state.currentUser = {}
      state.error = ''
      state.loading = false
      state.token='';
      console.log(state.currentUser)
    },
    fetchUserData(){
      console.log("Fetch User Data - slice")
    }
  },
})

export const authActions = auth.actions

export default auth.reducer
