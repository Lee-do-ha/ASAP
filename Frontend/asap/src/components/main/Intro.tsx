import React from 'react';
import mainImg from 'assets/main/intro.png';
import { ReactComponent as Button } from 'assets/main/introbutton.svg';
import 'styles/main/Intro.scss';

interface IIntrorops {
  navigate: string;
  text: string;
}

function Intro({ navigate, text }: IIntrorops) {
  const onNavigateHandler = () => {
    window.location.href = navigate;
  };

  return (
    <div className="intro-container">
      <div className="text-container">
        <div className="smalltext">블록체인을 활용한 투명한 API</div>
        <div className="maintext">
          <span className="color-text">ASAP</span>과 함께라면
        </div>
        <div className="boldtext maintext">데이터 연결이 쉬워집니다</div>
        <button
          type="button"
          onClick={onNavigateHandler}
          className="main-button up"
        >
          <div className="buttontext">{text}</div>
          <Button className="intro-button" />
        </button>
      </div>
      <div className="image-container">
        <img src={mainImg} alt="mainImg" />
      </div>
    </div>
  );
}

export default Intro;
