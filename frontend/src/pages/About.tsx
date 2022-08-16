import React from "react";
import './About.css'
import TTabout from "../assets/image/TTabout.png"
import Party from "../assets/image/aboutparty.jpg"
import Play from "../assets/image/aboutplay.jpg"
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate()
  // const saTriggerMargin = 300;
  // const saElementList = document.querySelectorAll('.about-one');

  // const saFunc = function() {
  //   for (const element of saElementList) {
  //     if (!element.classList.contains('show')) {
  //       if (window.innerHeight > element.getBoundingClientRect().top + saTriggerMargin) {
  //         element.classList.add('show');
  //       }
  //     }
  //   }
  // }

  // window.addEventListener('load', saFunc);
  // window.addEventListener('scroll', saFunc);

  return (
    <div id="about">
      <div className="about-container">
        <div className="about-title">ABOUT TRPG</div>
        <div className="about-one">
          <img className="TTabout" src={TTabout} alt="TTabout" />
          <div className="about-explain-one">
            <p>TRPG는 Tabletalk Role Playing Game의 줄임말로,</p>
            <p>테이블에 둘러 앉아 각자가 맡은 역할을 연기하며 스토리를 전개해 나가는 게임입니다.</p>
            <p>룰북에 따라 게임을 진행하고, 특정 이벤트가 발생하면 주사위를 굴려 모든 것을 결정합니다.</p>
            <p>게임 마스터 (GM)은 게임의 진행자로서 이야기의 판과 큰 틀을 제시하고, 플레이어들의 결정을 반영하여 이야기를 이끌어 나갑니다.</p>
            <p>플레이어는 마스터의 설명에 반응하여 각자 자신의 캐릭터가 된 것처럼 대사와 행동 묘사를 하며 역할극을 수행합니다.</p>
          </div>
        </div>
        <div className="about-one">
          <div className="about-explain-two">
            <p>TRPG를 해보고 싶지만 함께 플레이 할 사람을 찾기 힘드셨나요?</p>
            <p>TT에서 파티원을 구해보세요. GM도, Player도 모두 구하실 수 있습니다.</p>
          </div>
          <img className="TTabout" src={Party} alt="aboutparty" />
        </div>
        <div className="about-one">
          <img className="TTabout" src={Play} alt="aboutplay" />
          <div className="about-explain-one">
            <p>룰이 많고 복잡해서 게임 플레이에 어려움이 있으셨나요?</p>
            <p>TT에서는 모두가 즐길 수 있는 간편한 룰과 편의성을 제공합니다.</p>
          </div>
        </div>
        <div className="about-footer">
          <div className="about-explain-foot">지금 바로 시작하세요</div>
          <button className="about-btn button--moema button--text-thick button--text-upper button--size-s" onClick={() => {navigate('/meeting')}}>TT 시작하기</button>
        </div>
      </div>
    </div>
);
}