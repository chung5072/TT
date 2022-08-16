import React from "react";
import './About.css'
import TTabout from "../assets/image/TTabout.png"

export default function About() {
   

  return (
    <div id="about">
      <div className="about-container">
        <h1>About TRPG</h1>
        <div>
          <img className="TTabout" src={TTabout} alt="TTabout" />
        </div>
        <div className="about-explain">
          TRPG 설명
        </div>
      </div>
    </div>
);
}