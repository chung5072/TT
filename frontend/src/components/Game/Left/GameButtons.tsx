import { useAppDispatch } from "../../../app/hooks"
import { setPlayerProfile } from "../../../features/Game/LeftSlice"
export default function GameButtons() {
  const dispatch = useAppDispatch()
  const setPlayerNum: any = (num: number) => {
      dispatch(setPlayerProfile(num))
    }
  return (
      <div>
        <div id="player-one" className="left-button" onClick={setPlayerNum(1)}></div>
        <div id="player-two" className="left-button" onClick={setPlayerNum(2)}></div>
        <div id="player-three" className="left-button" onClick={setPlayerNum(3)}></div>
        <div id="player-four" className="left-button" onClick={setPlayerNum(4)}></div>
        <div id="player-five" className="left-button" onClick={setPlayerNum(5)}></div>
      </div>
        
    )
}