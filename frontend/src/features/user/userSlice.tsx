import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create } from 'yup/lib/array';
import { request } from '../../utils/axios'

export type userData = {
    id: string;
    password:string;
    nickname:string;
    email:string;
    phone:string;
    gender:string;
}

export const initialState: userData = {
    id: "",
    password:"",
    nickname:"",
    email:"",
    phone:"",
    gender:"",

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

