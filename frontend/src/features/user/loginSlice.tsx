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
export const {saveToken} = actions
export default loginSlice.reducer