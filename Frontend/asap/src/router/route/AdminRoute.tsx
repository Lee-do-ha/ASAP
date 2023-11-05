import React from 'react';

interface Props {
  children: React.ReactElement;
}

/**
 * admin 계정만 접근 가능
 * @param children 페이지 컴포넌트
 * @returns admin 로그인이 안되어 있을 경우 admin 로그인 페이지로 이동
 */

function AdminRoute({ children }: Props) {
  // admin 확인 조건 추가 필요
  return children;
}

export default AdminRoute;
