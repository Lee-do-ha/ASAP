import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import UserApi from './UserApi';
import SupplierApi from './SupplierApi';

function MyApi() {
  const { loginType } = useAuthStore((state) => state);

  if (loginType === 'supplier') {
    return <SupplierApi />;
  }
  return <UserApi />;
}

export default MyApi;
