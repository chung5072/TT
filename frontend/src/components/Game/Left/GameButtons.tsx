import { useAppDispatch } from "../../../app/hooks"
import { setPlayerProfile, setStatus } from "../../../features/Game/LeftSlice"
import "./GameButtons.css"
export default function GameButtons() {
  const dispatch = useAppDispatch()
  const setPlayerNum: any = (num: number) => {
      dispatch(setPlayerProfile(num))
    }
  const setDivStatus: any = (num:number) => {
    dispatch(setStatus(num))
  }
  const test: any = () => {
  }
  return (
      <div id="button-box">
        <button id="player-one" className="left-button" onClick={() => setPlayerNum(1)}>1</button>
        <button id="player-two" className="left-button" onClick={() => setPlayerNum(2)}>2</button>
        <button id="player-three" className="left-button" onClick={() => setPlayerNum(3)}>3</button>
        <button id="player-four" className="left-button" onClick={() => setPlayerNum(4)}>4</button>
        <button id="player-five" className="left-button" onClick={() => setPlayerNum(5)}>5</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(2)}>Map</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(3)}>Item</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(4)}>Mon</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(5)}>Rule</button>
        {/* <button id="player-five" className="left-button" onClick={() => setDivStatus(6)}>확인용 버튼 - MonsterStage</button> */}
        <button id="player-five" className="left-button" onClick={() => setDivStatus(0)}>Home</button>
        <button id="player-five" className="left-button" onClick={() => setDivStatus(99)}>GM</button>
      </div>
        
    )
}