import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
export type gameData = {
  gameId: number
  meetCode: number
  isGm: boolean
  mapStatus: number
  windowSize: number
  playerNum: number

} 

const initialState = {
    gameId: 0,
    meetCode: 0,
    isGm: false,
    mapStatus: 1,
    windowSize: 0,
    playerNum: 0,

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state: gameData, action) => {

        },
        setMapState: (state:gameData, action) => {
            const map = action.payload.name
            if (map ==='Swamp') {
                state.mapStatus = 1
            }
            if (map ==='Start') {
                state.mapStatus = 0
            }
            if (map ==='Forest') {
                state.mapStatus = 2
            }
            if (map ==='Cavern') {
                state.mapStatus = 3
            }
            if (map ==='Mountain') {
                state.mapStatus = 4
            }
            if (map ==='Devil') {
                state.mapStatus = 5
            }
            
        },
        setWindowSize: (state:gameData, action) => {
            state.windowSize = action.payload
        }
    }
})

const { reducer, actions } =gameSlice
export const {setGameState, setMapState, setWindowSize} = actions
export default gameSlice.reducer