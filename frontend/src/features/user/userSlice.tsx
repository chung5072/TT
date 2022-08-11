import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "yup/lib/array";
import { request } from "../../utils/axios";
import axios from "axios";

export type userData = {
  userId: string;
  userPw: string;
  userNickname: any;
  userEmail: string;
  userPhone: string;
  userGender: string;
  userCode: any;
};

export const initialState: userData = {
  userId: "",
  userPw: "",
  userNickname: localStorage.getItem('user_nickname'),
  userEmail: "",
  userPhone: "",
  userGender: "",
  userCode: localStorage.getItem('userCode'),
};




const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfile: (state: userData, action) => {
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
      state.userId = action.payload.userId;
      state.userPw = action.payload.userPw;
      state.userNickname = action.payload.userNickname;
      state.userGender =action.payload.userGender;
      state.userCode = action.payload.userCode
      localStorage.setItem('user_nickname', action.payload.userNickname)
    },
  },
});

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// }

export const sendRegisterRequest = createAsyncThunk(
  "sendRegisterRequest",
  async (data) => {
    return request("POST", "api/user/register", data);
  },
);

const { reducer, actions } = userSlice; //
export const { fetchProfile } = actions;
export default userSlice.reducer;
