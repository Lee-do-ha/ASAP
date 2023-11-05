import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import PublicMain from './PublicMain';
import SupplierMain from './SupplierMain';

function MainPage() {
  const { isLoggedIn, loginType } = useAuthStore();

  if (isLoggedIn && loginType === 'supplier') {
    return <SupplierMain />;
  }
  return <PublicMain />;
}

export default MainPage;
