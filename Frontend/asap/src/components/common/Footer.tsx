import React from 'react';
import { ReactComponent as Logo } from 'assets/images/Logo_F.svg';
import 'styles/common/Footer.scss';

function Footer() {
  return (
    <div className="footer-container">
      <div className="left">
        <div>
          <div className="title">ASAP</div>
          <div>회사소개</div>
          <div>인재채용</div>
        </div>
        <div>
          <div className="title">정책</div>
          <div>이용약관</div>
          <div>개인정보처리방침</div>
          <div>유료서비스이용약관</div>
          <div>보안정책</div>
        </div>
        <div>
          <div className="title">문의</div>
          <div>ssafyc202@gmail.com</div>
        </div>
      </div>
      <div className="right">
        <Logo className="logo" />
        <div className="content">
          <div>ssafy 광주 2반 C202 특화 프로젝트</div>
          <div>양시온, 문지은, 박서희, 송아람, 이도하, 이찬웅</div>
        </div>
        <div className="copyright">
          ASAP © 2023. All rights reserved by C202
        </div>
      </div>
    </div>
  );
}

export default Footer;
