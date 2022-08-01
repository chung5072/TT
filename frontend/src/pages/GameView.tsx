import LeftController from "../components/Game/LeftController"
import GamePlay from "../components/Game/GamePlay"
import CameraView from "../components/Game/CameraView"
import MyController from "../components/Game/MyController"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../app/hooks"
import { setGameState } from "../features/Game/GameSlice"
import { useParams } from "react-router-dom"
import { RootState } from "../app/store"


export default function GameView() {
  let {gameId} = useParams()
  const gameState = useSelector((state: RootState) => state.game)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setGameState(gameId))
  }, [gameState])

    return (
        <div>
          <h1>GameView</h1>
          <LeftController/>
          <GamePlay/>
          <CameraView/>
          <MyController/>
        </div>
        
    )
}