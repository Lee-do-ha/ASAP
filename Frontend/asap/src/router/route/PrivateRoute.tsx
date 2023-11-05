import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 로그인 한 유저만 접근 가능한 라우트 (사용자, 제공자 모두 접근 가능)
 * @param children 페이지 컴포넌트
 * @returns 로그인 안한 상태면 로그인 페이지로 이동, 로그인 후에 이전 페이지로 리다이렉션
 */

function PrivateRoute({ children }: Props) {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  // 페이지 접근시 인증 초기화
  sessionStorage.removeItem('isAuthenticated');

  if (!isLoggedIn) {
    // 로그인하지 않은 상태라면 현재 위치를 저장
    sessionStorage.setItem('prevLocation', location.pathname);
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default PrivateRoute;
