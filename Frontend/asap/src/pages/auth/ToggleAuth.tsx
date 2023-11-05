import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/images/Logo.svg';

function ToggleAuth() {
  const navigate = useNavigate();
  const { loginType, setLoginType } = useAuthStore();

  const prevLocation = sessionStorage.getItem('prevLocation');
  const defaultRedirect = '/';

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 계정 전환 하고 이전 페이지로 이동
  const toggleAccount = () => {
    const newLoginType = loginType === 'user' ? 'supplier' : 'user';
    setLoginType(newLoginType);
    // navigate('/');
    window.location.replace(prevLocation || defaultRedirect);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Logo className="h-64 w-auto" />
      <div className="text-3xl font-semibold flex">
        <p className="color-blue font-extrabold">
          {loginType === 'user' ? '제공자' : '사용자'}
        </p>
        만 접근 가능한 페이지입니다.
      </div>
      <div className="flex justify-end mt-10 gap-2">
        <Button onClick={handleGoBack} className="bg-gray-500">
          뒤로 가기
        </Button>
        <Button onClick={toggleAccount} className="bg-skyblue">
          계정 전환하기
        </Button>
      </div>
    </div>
  );
}

export default ToggleAuth;
