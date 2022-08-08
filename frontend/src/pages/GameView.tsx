import LeftController from "../components/Game/LeftController"
import GamePlay from "../components/Game/GamePlay"
import CameraView from "../components/Game/CameraView"
import MyController from "../components/Game/MyController"
import SetProfile from "../components/Game/SetProfile"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../app/hooks"
import { setGameState, setMapState } from "../features/Game/GameSlice"
import { setSignalHistory} from "../features/Game/SignalSlice";
import { useParams } from "react-router-dom"
import { RootState } from "../app/store"
import "./GameView.css"

//* 서버와 메세지 통신을 위해 SOCK JS 및 STOMP JS 도입
//* 참고사이트 : http://jmesnil.net/stomp-websocket/doc/
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

const serverUrl = `http://localhost:8080/api/signal`;

export default function GameView() {
  //* 서버에 메세지 통신을 위한 sock js 및 stomp js
  let sockJS = new SockJS(`${serverUrl}/webSocket`); //! /webSocket : 클라이언트에서 서버로 접속하는 엔드포인트
  let client = webstomp.over(sockJS);

  //* url param에서 방 정보를 가져옴
  let {gameId} = useParams()
  const gameState = useSelector((state: RootState) => state.game)
  const signalHistory = useSelector((state:RootState) => state.signal)
  const dispatch = useAppDispatch()

  // const [signalHistory, setSignalHistory] = useState<string[]>([]);
  useEffect(() => {
    dispatch(setGameState(gameId))
  }, [gameState])
  //* [logHistory]에 변화가 있을 때마다 페이지 리렌더링
  useEffect(()=>{
    client.connect({id: gameId},()=>{ //! connect을 하고나서 subscribe를 해야함
      //! 메세지를 수신하는 url 
      //! /topic 같은 경우는 빽에서 지정한 값 - 주로 다른 모든 이들에게 값을 넘겨주는 경우에는 /topic을 사용한다고 함
      client.subscribe(`/topic/${gameId}`,  
      (data)=>{
        // 테스트 출력
        // console.log("서버에서 받은 값:",JSON.parse(data.body));

        // 서버에서 받은 로그 값
        if (data.body.includes("Start")  
          || data.body.includes("Forest")
          || data.body.includes("Devil")
          || data.body.includes("Cavern")
          || data.body.includes("Mountain")
          || data.body.includes("Swamp")
        ) {
          let areaName = data.body;
        
          const areaMap = new Map();
          areaMap.set("Start", "Myrian");
          areaMap.set("Forest", "Black Forest");
          areaMap.set("Devil", "DevilDom");
          areaMap.set("Cavern", "Dark Cavern");
          areaMap.set("Mountain", "Deep Under the Mountain");
          areaMap.set("Swamp", "Swamp Denizens");

          areaName = `${areaMap.get(areaName)}로 이동합니다.`;
          // 테스트 출력
          console.log(areaName);
          alert(areaName);
          
          //? state를 적용했을 때 사용했던 코드
          // addSignal(areaName);

          //* 새로고침해도 로그를 남기기 위해서 redux를 도입
          dispatch(setSignalHistory(areaName));
        }
        
        
        //! 지속해서 연결을 유지하면 문제 발생
        //! 연결 유지한만큼 send의 갯수가 늘어남
        //! 따라서 보내고 바로 취소해줌
        client.disconnect();
        // 테스트 출력 - 범위 확인
        console.log("연결 종료");
    });
  });
  }, [signalHistory]);

  // function addSignal(newSignal : string) {
  //   setSignalHistory((prev : string[]) => {
  //     return [...prev, newSignal];
  //   })
  // }

  return (
    <div className="game-view">
      {/* <h1>GameView</h1> */}
      <LeftController signalHistory={signalHistory.signal}/>
      <GamePlay
        // sockJS = {sockJS}
        client = {client}
        gameId = {gameId}
      />
      <CameraView/>
      <MyController
        client = {client}
        gameId = {gameId}
        dispatch = {dispatch}
      />
      <SetProfile/>
    </div>
  )
}
