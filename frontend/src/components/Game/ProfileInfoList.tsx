export const warrior = {
  name: 'Warrior',
  hp: 10,
  skill: ["매일 같이 갑옷과 칼솜씨만을 의지하며 뒤도 돌아보지 않고 위험 속에 뛰어들지만, 남들은 고마운 줄을 모릅니다. 그런 것은 전혀 아쉽지 않습니다.\n당신이 이 일을 하는 건 뛰는 가슴과 싸움의 함성, 그리고 뜨겁고 뜨거운 피 때문입니다. 친구들은 강철로 만든 검을 가지고 다니지만, 전사여, 당신은 강철 그 자체입니다.\n무엇이 되었건 부딪쳐 보라고 하십시오. 먼지가 걷히고 나면 서 있는 것은 당신뿐일 테니까요."],
  value: {
    'good': '약한 자를 보호',
    'evil': '항복했거나 저항하지 못하는 적을 죽임',
    'neutral': '강한 상대를 쓰러트림'
  }
}

export const wizard = {
  name: 'Wizard',
  hp: 4,
  skill: ["이 세계는 법칙으로 움직입니다. 그 법칙은 사람의 법률도 아니고, 어느 좀스러운 폭군의 변덕도 아닙니다. 그보다 더 크고, 더 좋은 법칙입니다.\n당신은 고서에 얼굴을 파묻고 오랜 시간을 보냈습니다. 실험 때문에 미칠 뻔한 적도 많고, 소환 의식이 잘못되어 영혼이 날아갈 뻔 한 적도 있습니다.\n그 모든 것은 무엇을 위해서 한 것입니까? 당연히 힘을 위해 한 것입니다. 달리 추구할 것이 세상에 어디 있단 말입니까?\n남들은 당신을 백안시합니다. 등 뒤에서 “흑마술사”니 “악마소환사”니 수군대며 손가락질을 합니다. 물론 그것은 우주의 비밀을 알지 못하는 자들의 질투일 뿐입니다."],
  value: {
    'good': '다른 사람을 직접적으로 도움',
    'evil': '마법을 이용해서 공포를 일으킴',
    'neutral': '수수께끼에 관한 사실을 밝힘 - 남에게 관심이 없음'
  }
}

export const hunter = {
  name: 'Hunter',
  hp: 8,
  skill: ["누구는 당신을 길잡이라고 합니다. 누구는 숲사람이라고, 누구는 야인이라고 합니다. 그러나 그런 말들은 야생의 몸과 마음을 담아낼 수 없습니다.\n당신은 지금까지 혼자 야외에서 살아 왔지만, 위대한 무언가가, 어쩌면 운명이, 당신을 불러 이 도시 사람들과 함께 두었습니다. 이 사람들이 모르는 땅의 비밀을 당신은 알고 있습니다.\n당신이 없으면 모두가 길을 잃습니다. 사냥꾼이여, 피와 어둠을 뚫고 길을 밝히십시오."],
  value: {
    'good': '누군가를 물리적, 정신적, 사회적 속박으로부터 풀어준다 - 감옥에서 풀어주는 느낌?',
    'evil': '자연의 섭리에 어긋나는 위험한 것과 싸우기 위해 스스로 위험에 빠트립니다.',
    'neutral': '야생의 신령 또는 동물을 도와줍니다.'
  }
}

export const thief = {
  name: 'Thief',
  hp: 6,
  skill: ["모닥불 주변에서 친구들이 떠드는 그 사이에 당신은 돈을 세면서 씨익 웃습니다. 이 세상에서 진짜 중요한 것이 다름 아닌 돈임을 당신은 잘 알고 있습니다.\n 당신이 혼자 슬쩍 빠져나갈 때마다 동료들은 의심하며 타박하지만, 당신이 없었으면 모두 벽에서 발사된 칼날에 해부가 되었거나 고대인들의 독침 덫에 걸려 길고 괴로운 죽음을 맞았을 것입니다.\n 그러니 마음껏 불평불만을 하라고 내버려 두십시오. 모험질이 끝나면 영웅님들의 무덤에 건배를 올리는 것은 당신이 될 테니까요."],
  value: {
    'good': '아무 계획 없이위험한 상황에 뛰어든다',
    'evil': '계획적으로 움직인다.',
    'neutral': '자기가 처한 위험이나 자기의 잘못을 남에게 전가합니다.'
  }
}

export const priest = {
  name: 'Priest',
  hp: 8,
  skill: ["모험가들이 가는 곳은 살벌하기가 짝이 없어 마치 신의 버림을 받은 듯합니다. 시체가 돌아다니지를 않나, 식인 짐승이 들끓지를 않나. 그래서 당신이 이곳에 필요한 것입니다.\n당신에게 있어서 이교도들에게 신의 영광을 보이는 것은 그냥 직무가 아니라 천부의 임무입니다. 검과 철퇴와 주문으로 말씀을 전파하고 무지한 야만의 땅에 깊은 칼자국을 내고 참된 믿음의 씨앗을 심는 것이야말로 곧 당신 삶의 보람입니다.\n온 세상에 가르쳐 주십시오, 누가 우주의 진정한 주인이신지.", "남을 치유하기 위해 스스로 위험에 빠트림", "교회의 교리나 신의 가르침을 따르기 위해서 스스로를\n위험에 빠트립니다."],
  value: {
    'good': '남을 치유하기 위해 스스로 위험에 빠트림',
    'evil': '남을 해침으로 자기의 교회나 신의 우월함을 증명합니다.',
    'neutral': '교회의 교리나 신의 가르침을 따르기 위해서 스스로를 위험에 빠트립니다.'
  }
}