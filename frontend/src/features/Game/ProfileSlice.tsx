import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { StringSchema } from 'yup'
import { warrior } from '../../components/Game/ProfileInfoList'
export type profileData = {
  playerUserCode: number
  playerSpecies: string
  playerName: string
  playerLook: string
  playerValue: string
  playerWeapon: string
  playerArmor: string
  playerHP: number
  playerSup1: number
  playerSup2: number
  playerSup3: number
  playerstat1: number
  playerstat2: number
  playerstat3: number
  playerstat4: number
  playerstat5: number
  playerstat6: number
  class_name: string
  skill1: string
  skill2: string
  skill3: string
  chooseLevel: number
  jobInfo: object

} 

const initialState = {
  playerUserCode: 0,
  playerSpecies: '',
  playerName: '',
  playerLook: '',
  playerValue: '',
  playerWeapon: '',
  playerArmor: '',
  playerHP: 0,
  playerSup1: 0,
  playerSup2: 0,
  playerSup3: 0,
  playerstat1: 0,
  playerstat2: 0,
  playerstat3: 0,
  playerstat4: 0,
  playerstat5: 0,
  playerstat6: 0,
  class_name: '',
  skill1: '',
  skill2: '',
  skill3: '',
  chooseLevel: 0,
  jobInfo: warrior

}

const profileSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
      addChooseLevel: (state:profileData) => {
        console.log(state.chooseLevel)
        state.chooseLevel += 1
      },
      subtractChooseLevel: (state:profileData) => {
        console.log(state.chooseLevel)
        state.chooseLevel -= 1
      },
      setJobInfo: (state:profileData, action) => {
        state.jobInfo = action.payload
      }
        
    }
})

const { reducer, actions } =profileSlice
export const {addChooseLevel, subtractChooseLevel,setJobInfo} = actions
export default profileSlice.reducer