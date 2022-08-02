import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
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
    token: localStorage.getItem('token') || '' ,
    credentials: {},
    isLoggedIn: localStorage.getItem('token') === '' ? 0 : 1,
    currentUser: '',

}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      saveToken: (state: loginData, action) => {
        state.token = action.payload.accessToken
        state.currentUser = action.payload.currentUser
        localStorage.setItem('token', action.payload)

      },
      removeToken: (state: loginData) => {
        localStorage.setItem('token', '')
        state.token = ''
        state.currentUser = ''

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
export const {saveToken, removeToken} = actions
export default loginSlice.reducer