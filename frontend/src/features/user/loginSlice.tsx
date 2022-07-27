import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { request } from '../../utils/axios'

export type loginData = {
    token: string
    credentials:object
    isLoggedIn: boolean
    
}

export type loginPayload ={
  userId: string
}

const initialState: loginData = {
    token: localStorage.getItem('token') || '' ,
    credentials: {},
    isLoggedIn: false

}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      saveToken: (state: loginData, action) => {
        state.token = action.payload
        state.isLoggedIn = true
        localStorage.setItem('token', action.payload)
        console.log(localStorage.getItem('token'))
        console.log(state.token)
        console.log(state.isLoggedIn)
      },
      removeToken: (state: loginData) => {
        localStorage.setItem('token', '')
        state.isLoggedIn = false
        state.token = ''
        console.log(localStorage.getItem('token'))
        console.log(state.token)
        console.log(state.isLoggedIn)
      }
  
      },
      
    },
  );

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// } 

export const sendLoginRequest = createAsyncThunk('sendRegisterRequest', async (data) => {
  return request('POST', 'api/user/register', data)
}  )

const { reducer, actions } =loginSlice
export const {saveToken, removeToken} = actions
export default loginSlice.reducer