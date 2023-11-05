import React from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 메인 페이지로 이동
  const handleGoToMainPage = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
        <p className="text-7xl font-extrabold color-blue">404 Not Found</p>
        <p className="text-center text-xl font-bold color-blue mt-2">
          페이지를 찾을 수 없습니다.
        </p>
        <div className="mt-10 text-lg font-semibold">
          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</p>
          <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
        </div>
        <div className="flex justify-end mt-10 gap-2">
          <Button onClick={handleGoBack} className="bg-gray-500">
            뒤로 가기
          </Button>
          <Button onClick={handleGoToMainPage} className="bg-skyblue">
            메인 페이지로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
