import React, { forwardRef } from 'react';
import useLogOut from 'hooks/api/auth/useLogOut';
import { ReactComponent as LogOut } from 'assets/icons/LogOut.svg';
import { Link } from 'react-router-dom';
import useAccountInfo from 'hooks/api/mypage/useAccountInfo';
import 'styles/common/Button.scss';

const MyPageDrop = forwardRef(() => {
  const { logOut } = useLogOut();
  const { memberInfo } = useAccountInfo();
  return (
    <div className="flex flex-col gap-2 content-center w-full">
      <div className="font-bold text-black text-lg flex justify-center">
        {memberInfo?.name} 님
      </div>
      <Link to="mypage/account" className="link-style">
        기본 정보
      </Link>
      <Link to="mypage/keys" className="link-style">
        키 관리
      </Link>
      <Link to="mypage/wallet" className="link-style">
        지갑 정보
      </Link>
      <Link to="mypage/credit" className="link-style">
        결제 수단 관리
      </Link>
      <button
        type="button"
        onClick={logOut}
        className="flex items-center justify-center"
      >
        <p className="text-red-600 font-bold me-1">로그아웃</p>
        <LogOut />
      </button>
    </div>
  );
});

export default MyPageDrop;
