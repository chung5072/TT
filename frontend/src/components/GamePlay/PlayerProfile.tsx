import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

export default function PlayerProfile() {
    const playerNum = useSelector((state: RootState) => state.left.playerNum )
    return (
        <div>
          <h1>PlayerProfile {playerNum}</h1>
        </div>
        
    )
}