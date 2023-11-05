import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { useLocation } from 'react-router-dom';
import SupplierNav from './SupplierNav';
import PublicNav from './PublicNav';

function NavBar() {
  const { isLoggedIn, loginType } = useAuthStore((state) => state);
  const location = useLocation();

  if (location.pathname.includes('/admin')) {
    return null;
  }

  if (isLoggedIn && loginType === 'supplier') {
    return <SupplierNav />;
  }

  if (!isLoggedIn || loginType === 'user') {
    return <PublicNav />;
  }

  return null;
}

export default NavBar;
