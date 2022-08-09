import { createSlice } from '@reduxjs/toolkit'

interface roomState {
  roomCode: any
  gmUserCode: any
  py1Code: any
  py2Code: any
  py3Code: any
  py4Code: any
  py5Code: any
}


export const initialState: roomState = {
  roomCode: '',
  gmUserCode: '',
  py1Code: '',
  py2Code: '',
  py3Code: '',
  py4Code: '',
  py5Code: ''
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRoomInfo: (state:roomState, action) => {
      state.gmUserCode = action.payload.gmUser
      state.py1Code = action.payload.py1Code
      state.py2Code = action.payload.py2Code
      state.py3Code = action.payload.py3Code
      state.py4Code = action.payload.py4Code
      state.py5Code = action.payload.py5Code
    }
  }
})


const {actions} = roomSlice
export const {getRoomInfo} = actions
export default roomSlice.reducer