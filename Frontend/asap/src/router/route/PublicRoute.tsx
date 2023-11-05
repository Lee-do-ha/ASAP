import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 비로그인 유저만 접근 가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 로그인 한 상태면 메인페이지로 이동
 */

function PublicRoute({ children }: Props) {
  const { isLoggedIn } = useAuthStore();

  // 페이지 접근시 인증 초기화
  sessionStorage.removeItem('isAuthenticated');
  return isLoggedIn ? <Navigate to="/" /> : <div>{children}</div>;
}

export default PublicRoute;
