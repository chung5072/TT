import { createSlice, current } from '@reduxjs/toolkit'

interface meetingState  {
  meetingCode: any
  meetingTitle:any
  meetingAuthor: any
  meetingDate: any
  meetingContent:any
  meetingPyNum: any
  meetingPyTime: any
  meetingGameIsStart: any
  meetingList: Array<object>
}

export const initialState: meetingState = {
  meetingCode: '',
  meetingTitle:'',
  meetingAuthor: '',
  meetingDate: '',
  meetingContent:'',
  meetingPyNum: '',
  meetingPyTime: '',
  meetingGameIsStart: '',
  meetingList: [],
}

export const meetingSlice = createSlice({
  
  name: 'meeting',
  initialState,
  reducers: {
    getMeetingList:(state:meetingState, action) => {
      state.meetingList = action.payload
      //console.log(state)
      console.log(state.meetingList)
    },

    getMeetingDetail: (state:meetingState, action) => {
      state.meetingCode = action.payload.meetingCode
      state.meetingTitle = action.payload.meetingTitle
      state.meetingContent = action.payload.meetingContent
      state.meetingAuthor = action.payload.meetingAuthor
      state.meetingDate = action.payload.meetingView
      state.meetingPyNum = action.payload.meetingPyNum
      state.meetingPyTime = action.payload.meetingPyTime
    },

    editMeetingContent: (state:meetingState, action) => {
      state.meetingCode = action.payload.meetingCode
      state.meetingTitle = action.payload.meetingTitle
      state.meetingContent = action.payload.meetingContent
      state.meetingAuthor = action.payload.meetingAuthor
      state.meetingPyNum = action.payload.meetingPyNum
      state.meetingPyTime = action.payload.meetingPyTime
    }
  }
})

const { actions } = meetingSlice
export const { getMeetingList, getMeetingDetail } = actions
export default meetingSlice.reducer