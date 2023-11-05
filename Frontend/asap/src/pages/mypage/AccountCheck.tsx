import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Button } from '@material-tailwind/react';
import useCheckPw from 'hooks/api/auth/useCheckPw';
import Modal from 'components/common/Modal';

function AccountCheck() {
  const { checkPw } = useCheckPw();
  const [userPassword, setUserPassword] = useState<string>(''); // 입력한 비밀 번호
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userPassword) {
      setModalMessage('비밀번호를 입력해주세요.');
      setIsModalOpen(true);
      return;
    }
    const checkPwSuccess = await checkPw({ password: userPassword });

    if (!checkPwSuccess) {
      setModalMessage('비밀번호를 다시 입력해주세요.');
      setIsModalOpen(true);
      setUserPassword('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* 안내 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        confirm
        message={modalMessage}
      />
      <div className="font-extrabold text-4xl mb-3 color-blue">
        비밀번호 확인
      </div>
      <div className="my-6 text-lg">
        <div>인증이 필요한 페이지입니다.</div>
        <div>비밀번호 입력 후 확인 버튼을 클릭해 주세요.</div>
      </div>
      {/* 비밀번호 입력 form */}
      <form onSubmit={onSubmitHandler}>
        <div className="flex gap-4">
          <div>
            <Input
              label="비밀번호"
              value={userPassword}
              type="password"
              onChange={onPasswordHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
          <div className="flex justify-center">
            <Button ripple type="submit" className="btn-width">
              확인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountCheck;
