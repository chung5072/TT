import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
export default function GamePlay() {
  const divStatus = useSelector((state: RootState) => state.left.divStatus )
    return (
        <div>
          <h1>GamePlay</h1>
          if (divStatus == 1) {
            
          }
        </div>
        
    )
}