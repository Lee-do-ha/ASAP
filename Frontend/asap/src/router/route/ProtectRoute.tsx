import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 회원 인증 한 유저만 접근 가능한 라우트 (마이페이지 관련)
 * @param children 페이지 컴포넌트
 * @returns 회원 인증 안한 상태면 회원 인증 페이지로 이동, 회원 인증 후 이전 페이지로 리다이렉션
 */

function ProtectRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // 회원 인증하지 않은 상태라면 현재 위치를 저장
    sessionStorage.setItem('prevLocation', location.pathname);
    return <Navigate to="/mypage/check" />;
  }

  return <div>{children}</div>;
}

export default ProtectRoute;
