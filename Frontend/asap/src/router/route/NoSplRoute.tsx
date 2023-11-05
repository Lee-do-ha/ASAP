import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 제공자만 접근 불가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 제공자일 경우 계정 전환 페이지로 이동하고 계정 전환 후 이전 페이지로 이동
 */

function NoSplRoute({ children }: Props) {
  const { isLoggedIn, loginType } = useAuthStore();
  const location = useLocation();

  // 페이지 접근시 인증 초기화
  sessionStorage.removeItem('isAuthenticated');

  if (isLoggedIn && loginType === 'supplier') {
    // 제공자라면 이전 위치 저장
    sessionStorage.setItem('prevLocation', location.pathname);
    return <Navigate to="/change_account" />;
  }

  return <div>{children}</div>;
}

export default NoSplRoute;
