import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

/**
 * 제공자만 접근 가능한 라우터
 * @param children 페이지 컴포넌트
 * @returns 제공자가 아닐 경우 계정 전환 페이지로 이동 계정 전환 후 이전페이지로 이동
 */

function SupplierRoute({ children }: Props) {
  const { isLoggedIn, loginType } = useAuthStore();
  const location = useLocation();

  // 페이지 접근시 인증 초기화
  sessionStorage.removeItem('isAuthenticated');

  if (isLoggedIn && loginType === 'supplier') {
    return <div>{children}</div>;
  }

  // 제공자가 아니라면 이전 위치 저장
  sessionStorage.setItem('prevLocation', location.pathname);
  return <Navigate to="/change_account" />;
}

export default SupplierRoute;
