import GameButtons from "./Left/GameButtons"
import GameLog from "./Left/GameLog"
import "./LeftController.css"
export default function LeftController() {
    return (
        <div className="left-controller">
          <h1>game</h1>
          <GameButtons/>
          <GameLog/>
        </div>
        
    )
}