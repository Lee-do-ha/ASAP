import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import useFindId from 'hooks/api/auth/useFindId';

function FindId() {
  const { findId } = useFindId();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const onFindHandler = async () => {
    await findId({ email: userEmail, name: userName });
  };

  return (
    <div>
      아이디 찾기
      {/* 이메일 입력 */}
      <div>회원정보에 등록된 정보로 아이디를 찾을 수 있습니다.</div>
      <div className="w-72">
        <Input
          type="email"
          placeholder="이름"
          value={userName}
          onChange={onNameHandler}
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin=""
        />
        <Input
          type="email"
          value={userEmail}
          onChange={onEmailHandler}
          placeholder="이메일"
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin=""
        />
        <Button ripple onClick={onFindHandler}>
          아이디 찾기 테스트
        </Button>
      </div>
    </div>
  );
}

export default FindId;
