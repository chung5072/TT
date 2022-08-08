import GameButtons from "./Left/GameButtons"
import GameLog from "./Left/GameLog"
import "./LeftController.css"

export default function LeftController({signalHistory} : {signalHistory : string[]}) {
    return (
        <div className="left-controller">
          <GameButtons/>
          <GameLog signalHistory = {signalHistory}/>
        </div>
        
    )
}
