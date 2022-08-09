import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
export default function GmControl({client, gameId} : {client : any, gameId : any}) {

  const mapStatus = useAppSelector((state:RootState) => state.game.mapStatus)
  const formik = useFormik({
    initialValues: {monsterId: 0, monsterNum: 0},
    // validationSchema: Yup.object({
    //   userId: Yup.number()
    //   .required('Required'),
    //   userPw: Yup.number()
    //   .required('Required'),
    // }),
    onSubmit: (data) => {
      // 여기에서 submit 보내시면 돼요
      // 테스트 출력
      // console.log("지역 번호:", mapStatus);

      //* 몬스터 등장 숫자 - 랜덤값
      // 테스트 출력
      // console.log("몬스터 아이디:", data.monsterId);
      // console.log("입력받은 타입:", typeof data.monsterId);
      
      let monsterId = 0;

      //? 맨 첫번째 몬스터 같은 경우 아이디가 0으로 나타나서 1로 작성
      //? 그 다음 몬스터부터는 아이디 값을 그대로 부여
      //? 첫 번째 몬스터 아이디만 숫자로 뜨고 나머지 2, 3, 4는 문자열로 나타남
      if (data.monsterId === 0) {
        monsterId = 1
      } else if (typeof(data.monsterId) === 'string') {
        monsterId = parseInt(data.monsterId);
      }

      let randomNum = monsterId === 1 ? (Math.floor(Math.random() * (4 - 1 + 1)) + 1) 
                    : monsterId === 2 ? (Math.floor(Math.random() * (3 - 1 + 1)) + 1)
                    : monsterId === 3 ? (Math.floor(Math.random() * (2 - 1 + 1)) + 1) 
                    : 1
      // 테스트 출력
      // console.log("랜덤 숫자:",randomNum);
      
      data.monsterNum = randomNum;

      const monsterData = {
        mapArea : mapStatus, // 지역 번호
        monsterId : monsterId, // 몬스터 아이디
        monsterNum : data.monsterNum // 등장한 몬스터 수
      }

      //* 서버에 메세지 전송
      //? connect를 하고 callback으로 send을 하면 값이 나가지 않음 
      client.send(`/ttrpg/mon/${gameId}/sendSignal`, JSON.stringify(monsterData), {id : gameId}); //* 몬스터 정보
      client.send(`/ttrpg/event/${gameId}/sendSignal`, JSON.stringify(monsterData), {id : gameId}); //* 이벤트 로그
    }
  })
  return (
    <div>
      <h1>GmControl</h1>
      <div id="gm-control-box">
        <form action="" onSubmit={ formik.handleSubmit }>
          <label id='monster-id-label' htmlFor="monsterId">Monster Id</label>
          <select id="monsterId" name="monsterId" onChange={formik.handleChange} value={ formik.values.monsterId }>
            <option value="1">{mapStatus===1 ? "코볼트": mapStatus===2 ? "코카트리스": mapStatus===3? "드워프전사": mapStatus=== 4?"인면충": "미노타우르스"}</option>
            <option value="2">{mapStatus===1 ? "도마뱀인간": mapStatus===2 ? "그리폰": mapStatus===3? "지하인": mapStatus=== 4?"사슬악마": "아볼레스"}</option>
            <option value="3">{mapStatus===1 ? "거대악어": mapStatus===2 ? "오거    ": mapStatus===3? "거미왕": mapStatus=== 4?"가시악마": "용"}</option>
            <option value="4">{mapStatus===1 ? "코아틀": mapStatus===2 ? "혼돈의 즙": mapStatus===3? "오튜그": mapStatus=== 4?"천사": "종말의 용"}</option>
          </select>
          <button type="submit">Start Fight</button>
        </form>
      </div>
    </div>
  )
}