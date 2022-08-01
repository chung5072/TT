import LeftController from "../components/Game/LeftController"
import GamePlay from "../components/Game/GamePlay"
import "./GameView.css"
import CameraView from "../components/Game/CameraView"
import MyController from "../components/Game/MyController"
export default function GameView() {
    return (
        <div className="game-view">
          {/* <h1>GameView</h1> */}
          <LeftController/>
          <GamePlay/>
          <CameraView />
          <MyController />
        </div>
        
    )
}