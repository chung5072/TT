type monsterStateType =  {
  mapArea: number;
  monsterId: number;
  monsterNum: number;
}

export default function MonsterStage({monsterState} : {monsterState : monsterStateType}) {
  // 함수 작성
  // 지역에 따른 몬스터 종류
  const monsterKind = new Map();
  monsterKind.set(1, ["","코볼트", "도마뱀인간", "거대악어", "코아틀"]);
  monsterKind.set(2, ["","코카트리스", "그리폰", "오거", "혼돈의 즙"]);
  monsterKind.set(3, ["","드워프 전사", "지하인", "거미왕", "오튜그"]);
  monsterKind.set(4, ["","인면충", "사슬악마", "가시악마", "천사"]);
  monsterKind.set(5, ["","미노타우르스", "아볼레스", "용", "종말의 용"]);
  // 테스트 출력
  // console.log("선택한 지역:",monsterState.mapArea);
  // console.log("해당 지역에 등장한 몬스터 아이디",monsterState.monsterId);
  // console.log("해당 몬스터가 등장한 마릿수",monsterState.monsterNum);
  
  return (
    // html
    <div>
      <h1>몬스터 정보</h1>
      <hr />
      <p style={{"color" : "white"}}>몬스터 이름 : {monsterKind.get(monsterState.mapArea)[monsterState.monsterId]}</p>
      <p style={{"color" : "white"}}>몬스터 숫자 : {monsterState.monsterNum}</p>
    </div>
  )

  
}