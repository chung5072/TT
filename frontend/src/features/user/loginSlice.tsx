import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
export type loginData = {
    token: string
    credentials:object
    isLoggedIn: number
    currentUser: string
}

export type loginPayload ={
  userId: string
}

const initialState: loginData = {
    token: '',
    credentials: {},
    isLoggedIn: localStorage.getItem('token') === '' ? 0 : 1,
    currentUser: '',

}

const cookies = new Cookies()

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      saveToken: (state: loginData, action) => {
        state.token = action.payload.accessToken
        state.currentUser = action.payload.currentUser
        console.log(action.payload)
        cookies.set('refresh_token', action.payload.refreshToken, { sameSite: 'strict' });

      },
      removeToken: (state: loginData) => {
        state.token = ''
        state.currentUser = ''
        cookies.remove('refresh_token')

      },

      getAccessToken: (state:loginData) => {
        const refresh_token = cookies.get('refresh_token');
        console.log('refresh!!')
        console.log(refresh_token)
        axios({
          method:'POST',
          url: "http://localhost:8080/api/user/login",
          headers: {
            Authorization: `Bearer ${refresh_token}`
        }
        })
        .then((res) =>{
          state.token = res.data.accessToken
          state.currentUser = res.data.userId
        })
      }
  
      },
      
    },
  );

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// } 

// export const sendLoginRequest = createAsyncThunk('sendRegisterRequest', async (data) => {
//   return request('POST', 'api/user/register', data)
// }  )

const { reducer, actions } = loginSlice //
export const {saveToken, removeToken, getAccessToken} = actions
export default loginSlice.reducer