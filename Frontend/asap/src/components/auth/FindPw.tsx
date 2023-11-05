import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import useFindPw from 'hooks/api/auth/useFindPw';

function FindPw() {
  const { findPw } = useFindPw();
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const onFindHandler = async () => {
    await findPw({ email: userEmail, id: userId });
  };

  return (
    <div>
      비밀번호 찾기
      <div>회원정보에 등록된 정보로 비밀번호를 재설정할 수 있습니다.</div>
      <div className="w-72">
        <Input
          type="email"
          placeholder="아이디"
          value={userId}
          onChange={onIdHandler}
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
          비밀번호 변경 주소 발송
        </Button>
      </div>
    </div>
  );
}

export default FindPw;
