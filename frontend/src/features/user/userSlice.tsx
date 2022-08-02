import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create } from 'yup/lib/array';
import { request } from '../../utils/axios'
import axios from 'axios';

export type userData = {
    userId: string;
    userPw:string;
    userNickname:string;
    userEmail:string;
    userPhone:string;
    userGender:string;
}

export const initialState: userData = {
    userId: '',
    userPw:'',
    userNickname:'',
    userEmail:'',
    userPhone:'',
    userGender:'',

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      fetchProfile: (state: userData, action) => {
        axios({
          method: 'GET',
          url: "http://localhost:8080/api/" ,
          data: action.payload
        })
          .then((res) => {
            state.userEmail = res.data.useEmail
            state.userPhone = res.data.userPhone
            state.userId = res.data.userId
            state.userPw = res.data.userPw
            state.userNickname = res.data.userNickname
            state.userGender = res.data.userGender
          })
          .catch(err => {
            console.error(err.response.data)
          })
      }
  
      },
      
    },
  );

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// } 

export const sendRegisterRequest = createAsyncThunk('sendRegisterRequest', async (data) => {
  return request('POST', 'api/user/register', data)
}  )

const { reducer, actions } = userSlice //
export const {fetchProfile} = actions
export default userSlice.reducer

