import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
export type gameData = {
  gameId: number
  meetCode: number
  isGm: boolean
  mapStatus: number

} 

const initialState = {
    gameId: 0,
    meetCode: 0,
    isGm: false,
    mapStatus: 1

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state: gameData, action) => {

        }
    }
})

const { reducer, actions } =gameSlice
export const {setGameState} = actions
export default gameSlice.reducer