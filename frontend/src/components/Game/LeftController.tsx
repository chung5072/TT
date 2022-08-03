import GameButtons from "./Left/GameButtons"
import GameLog from "./Left/GameLog"
import "./LeftController.css"
export default function LeftController() {
    return (
        <div className="left-controller">
          <GameButtons/>
          <GameLog/>
        </div>
        
    )
}