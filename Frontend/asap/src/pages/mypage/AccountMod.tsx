import React, { useState, ChangeEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import SideBar from 'components/nav/SideBar';
import menus from 'router/data/mypage-menus';
import useModifyAccount from 'hooks/api/mypage/useModifyAccount';
import useAuthEmail from 'hooks/api/auth/useAuthEmail';

function AccountMod() {
  const { modifyMemberInfo } = useModifyAccount();
  const { postEmail, checkEmailCode } = useAuthEmail();

  const [userName, setUserName] = useState<string>('');

  const [userEmail, setUserEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');

  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUserEmail(event.target.value);

  const onPostEmailCode = async () => {
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    await postEmail(userEmail);
  };

  const onEmailCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(event?.target.value);
  };

  const onCheckEmailCode = async () => {
    await checkEmailCode({ email: userEmail, code: emailCode });
  };

  const onModifyMemberInfo = async () => {
    await modifyMemberInfo({ name: userName, email: userEmail });
  };

  return (
    <div className="container mx-auto page-container grid grid-cols-4">
      <div className="col-span-1 flex justify-start items-start ml-8">
        <SideBar menus={menus} />
      </div>
      <div className="col-span-3">
        개인 정보 수정
        <Input
          label="이름"
          value={userName}
          onChange={onNameHandler}
          crossOrigin=""
        />
        {/* 이메일 입력 */}
        <p>이메일</p>
        <div className="relative flex w-full my-3">
          <Input
            type="email"
            label="이메일 주소"
            value={userEmail}
            onChange={onEmailHandler}
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin=""
          />
          <Button
            size="sm"
            color={userEmail ? 'gray' : 'blue-gray'}
            disabled={!userEmail}
            className="!absolute right-1 top-1 rounded"
            onClick={onPostEmailCode}
          >
            인증 코드 전송
          </Button>
        </div>
        <div className="relative flex w-full my-3">
          <Input
            type="email"
            label="인증 코드"
            value={emailCode}
            onChange={onEmailCodeHandler}
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
            crossOrigin=""
          />
          <Button
            size="sm"
            color={emailCode ? 'gray' : 'blue-gray'}
            disabled={!emailCode}
            className="!absolute right-1 top-1 rounded"
            onClick={onCheckEmailCode}
          >
            인증 코드 확인
          </Button>
        </div>
        <Button
          type="button"
          style={{ border: '1px solid' }}
          onClick={onModifyMemberInfo}
        >
          개인 정보 수정 테스트
        </Button>
      </div>
    </div>
  );
}

export default AccountMod;
