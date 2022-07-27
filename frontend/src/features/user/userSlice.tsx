import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create } from 'yup/lib/array';
import { request } from '../../utils/axios'

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
  
      },
      
    },
  );

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// } 

export const sendRegisterRequest = createAsyncThunk('sendRegisterRequest', async (data) => {
  return request('POST', 'api/user/register', data)
}  )

