import LeftController from "../components/Game/LeftController"
import GamePlay from "../components/Game/GamePlay"
import CameraView from "../components/Game/CameraView"
import MyController from "../components/Game/MyController"
import SetProfile from "../components/Game/SetProfile"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setGameState } from "../features/Game/GameSlice"
import { setMonster } from "../features/Game/MonsterSlice"
import { setStatus } from "../features/Game/LeftSlice"
import { setSignalHistory } from "../features/Game/SignalSlice"
import "./GameView.css"

//* 서버와 메세지 통신을 위해 SOCK JS 및 STOMP JS 도입
//* 참고사이트 : http://jmesnil.net/stomp-websocket/doc/
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import axios from "axios"
import { getRoomInfo, setGmCondition } from "../features/room/RoomSlice"

const serverUrl = `http://localhost:8080/api/signal`;

export default function GameView() {
  //* 서버에 메세지 통신을 위한 sock js 및 stomp js
  let sockJS = new SockJS(`${serverUrl}/webSocket`); //! /webSocket : 클라이언트에서 서버로 접속하는 엔드포인트
  let client = webstomp.over(sockJS);

  //* url param에서 방 정보를 가져옴
  let {gameId} = useParams()
  const gameState = useSelector((state: RootState) => state.game)
  //* 몬스터 정보 state
  const monsterState = useSelector((state:RootState) => state.session).monster
  //* 이벤트 로그 state
  const signalState = useSelector((state:RootState) => state.session).signal
  const dispatch = useAppDispatch()
  const userCode = useAppSelector((state:RootState) => state.user.userCode)


  useEffect(() => {
    axios({
      method:'GET',
      url: `http://localhost:8080/api/roomInfo/${gameId}`
    })
    .then((res) => {
      console.log(res.data)
      console.log(userCode)
      dispatch(getRoomInfo(res.data))
      if (res.data.gmUserCode == userCode) {
        console.log('hihi')
        dispatch(setGmCondition(true))
      }
      else {
        dispatch(setGmCondition(false))
      }
      

    })
  }, [gameState])

  /**
   * * 몬스터 정보가 들어왔을 때 페이지를 강제로 몬스터 정보 페이지로 바꿔줌
   * @param num 페이지 번호
   */
  const setDivStatus: any = (num:number) => {
    dispatch(setStatus(num))
  }

  //! 이벤트 로그가 페이지를 관통하기에 게임 방 내에서 발생하는 정보를 공유하는데 활용함
  //* [signalState]에 변화가 있을 때마다 페이지 리렌더링
  useEffect(()=>{
    client.connect({id: gameId},()=>{ //! connect을 하고나서 subscribe를 해야함
      //! 메세지를 수신하는 url 
      //! /topic 같은 경우는 빽에서 지정한 값 - 주로 다른 모든 이들에게 값을 넘겨주는 경우에는 /topic을 사용한다고 함
      client.subscribe(`/topic/${gameId}/eventLog`,  
      (data : any)=>{
        // 테스트 출력
        console.log("서버에서 받은 값 - 지역 정보:", (data.body));

        //* 서버에서 받은 로그 값
        //* 지도 관련된 로그 값
        if (data.body.includes("Start")  
          || data.body.includes("Forest")
          || data.body.includes("Devil")
          || data.body.includes("Cavern")
          || data.body.includes("Mountain")
          || data.body.includes("Swamp")
        ) {
          let areaName = data.body;
        
          // Map - 지역 이름
          const areaMap = new Map();
          areaMap.set("Start", "Myrian");
          areaMap.set("Forest", "Black Forest");
          areaMap.set("Devil", "DevilDom");
          areaMap.set("Cavern", "Dark Cavern");
          areaMap.set("Mountain", "Deep Under the Mountain");
          areaMap.set("Swamp", "Swamp Denizens");

          //* 마지막 글자에 따라서 조사가 달라지기에 뜨는 로그가 다름
          // 마지막 글자
          let lastWordAboutArea = areaMap.get(areaName).substr(-1);

          if (lastWordAboutArea === 'm' || lastWordAboutArea === 'n') {
            areaName = `${areaMap.get(areaName)}으로 이동합니다.`;
          } else {
            areaName = `${areaMap.get(areaName)}로 이동합니다.`;
          }

          // 테스트 출력
          // console.log(areaName);

          //* 방에 있는 사람들에게 alert로 신호를 줌
          alert(areaName);
          
          //? state를 적용했을 때 사용했던 코드
          // addSignal(areaName);

          //* 새로고침해도 로그를 남기기 위해서 redux를 도입
          dispatch(setSignalHistory(areaName));
        }

        //* 서버에서 받은 로그 값
        //* 몬스터 정보 로그 값
        if(data.body.includes("monsterId")) {
          const monsterInfo = JSON.parse(data.body);
          // 테스트 출력
          console.log("서버에서 받은 값 - 몬스터 정보", monsterInfo);

          // Map - 지역에 따른 몬스터 종류 이름
          const monsterKind = new Map();
          monsterKind.set(1, ["","코볼트", "도마뱀인간", "거대악어", "코아틀"]);
          monsterKind.set(2, ["","코카트리스", "그리폰", "오거", "혼돈의 즙"]);
          monsterKind.set(3, ["","드워프 전사", "지하인", "거미왕", "오튜그"]);
          monsterKind.set(4, ["","인면충", "사슬악마", "가시악마", "천사"]);
          monsterKind.set(5, ["","미노타우르스", "아볼레스", "용", "종말의 용"]);

          //* 마지막 글자에 있는 중성에 따라서 조사가 달라지기에 뜨는 로그가 다름
          // 중성
          const Jung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

          // 마지막 글자
          const monsterName = ((monsterKind.get(monsterInfo.mapArea))[monsterInfo.monsterId]).substr(-1);
          // 중성 추출
          let code = monsterName.charCodeAt(0) - 0xAC00 as number;
          const jong = code % 28; // 종성 
          const jung = ((code - jong) / 28) % 21; // 중성
          // 테스트 출력
          // console.log("몬스터 마지막 글자에 있는 중성:",Jung[jung]);

          let monsterLog : string = '';
          
          // '도마뱀 인간'과 '코아틀'은 조사가 '이'로 들어와야 한다
          if (monsterName === '간' || monsterName === '틀' || monsterName === '즙') {
            monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}이 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
          }
          else if (Jung[jung] === "ㅡ" || Jung[jung] === "ㅓ" || Jung[jung] === "ㅏ") {
            monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}가 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
          } else {
            monsterLog = `${monsterKind.get(monsterInfo.mapArea)[monsterInfo.monsterId]}이 ${monsterInfo.monsterNum}만큼 등장했습니다.`;
          }

          //* 방에 있는 사람들에게 alert로 신호를 줌
          alert(monsterLog);

          //* 새로고침해도 로그를 남기기 위해서 redux를 도입 
          dispatch(setSignalHistory(monsterLog));
          dispatch(setMonster(monsterInfo));

          //! 몬스터의 정보가 바뀌었을 때마다 강제로 페이지가 이동하도록 작성
          setDivStatus(6);
          //? 추후에는 마스터가 아닌 사람들만 페이지가 이동될 것임
          // if (!gameState.isGm) {
          //   setDivStatus(6);
          // }
        }
        
        //! 지속해서 연결을 유지하면 문제 발생
        //! 연결 유지한만큼 send의 갯수가 늘어남
        //! 따라서 보내고 바로 취소해줌
        client.disconnect();
        // 테스트 출력 - 범위 확인
        console.log("연결 종료");
      });
    });
  }, [signalState]);

  return (
    <div className="game-view">
      {/* <h1>GameView</h1> */}
      <LeftController
        signalState = {signalState}/>
      <GamePlay
        // map에서 send
        client = {client}
        gameId = {gameId}
        monsterState = {monsterState}
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
