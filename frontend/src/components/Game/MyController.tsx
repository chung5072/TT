import "./MyController.css"
import { resetSignalHistory } from "../../features/Game/SignalSlice";
import { resetMonster } from "../../features/Game/MonsterSlice";
import { useNavigate } from 'react-router-dom'

export default function MyController({client, gameId, dispatch} : {client : any, gameId : any, dispatch : any}) {
  const navigate = useNavigate()
  function clickHandlerForExit() {
    // 테스트 출력 - state 비우기
    // console.log("state를 비워보자");

    //* redux state를 초기값으로 바꾸고 sessionStoreage를 clear() 시킴
    dispatch(resetSignalHistory());
    dispatch(resetMonster());

    //? 아직 뭔지 모르겠음
    // client.unsubscribe(roomId as string);

    //! 아래의 코드가 있어야 연결을 끊음으로 이후 같은 로그가 여러 줄 뜨는 것을 방지
    client.disconnect();

    // 페이지 이동
    navigate("/");
  }
    return (
        <div className="my-controller">
          <h1>MyController</h1>
          <button
            onClick={clickHandlerForExit}
          >나가는 버튼</button>
        </div>
        
    )
}