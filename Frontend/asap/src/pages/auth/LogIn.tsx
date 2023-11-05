import React, { useState, ChangeEvent, FormEvent } from 'react';
import useLogIn from 'hooks/api/auth/useLogIn';
import { Input, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Modal from 'components/common/Modal';

function LogIn() {
  const { logIn } = useLogIn();
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loginType, setLoginType] = useState<string>('user');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) {
      openModal();
      return;
    }
    if (!userPassword) {
      openModal();
      return;
    }
    await logIn({
      id: userId,
      password: userPassword,
      loginType,
    });
  };

  const modalMessage = () => {
    if (!userId) {
      return (
        <div className="w-96">
          <div className="flex justify-start">
            <p className="text-lg mt-5 font-bold">아이디를 입력해주세요.</p>
          </div>
          <div className="flex flex-row-reverse my-5">
            <Button ripple onClick={closeModal} className="bg-blue-500">
              확인
            </Button>
          </div>
        </div>
      );
    }
    if (!userPassword) {
      return (
        <div className="w-96">
          <div className="flex justify-start">
            <p className="text-lg mt-5 font-bold">비밀번호를 입력해주세요.</p>
          </div>
          <div className="flex flex-row-reverse my-5">
            <Button ripple onClick={closeModal} className="bg-blue-500">
              확인
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto form-container page-container">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalMessage()}
      </Modal>
      <div className="flex justify-center my-8">
        <p className="font-bold text-6xl text-blue">LogIn</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-7">
          <p className="text-lg font-extrabold text-blue">아이디</p>
          <div className="my-3">
            <Input
              label="아이디"
              value={userId}
              onChange={onIdHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="mb-7">
          <p className="text-lg font-extrabold text-blue">비밀번호</p>
          <div className="my-3">
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
        </div>
        <div className="flex items-center my-3">
          <p className="text-lg font-extrabold text-blue">계정 선택</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setLoginType('user')}
            className={`col-span-1 text-base font-bold ${
              loginType === 'user' ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            사용자
          </Button>
          <Button
            onClick={() => setLoginType('supplier')}
            className={`col-span-1 text-base font-bold ${
              loginType === 'supplier' ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            제공자
          </Button>
        </div>
        {/* 로그인 버튼 */}
        <div className="flex justify-center my-9">
          <Button ripple type="submit" className="btn-width">
            로그인
          </Button>
        </div>
      </form>

      <hr className="line-blue" />

      <div className="flex justify-center my-5">
        <p className="text-xl text-gray-500 font-semibold me-3">
          아직 회원이 아니신가요?
        </p>
        <Link to="/signup" className="text-xl font-bold text-blue">
          Signup
        </Link>
      </div>
      <div className="flex justify-center">
        <Link to="/find_account">
          <p className="text-lg font-bold">아이디 / 비밀번호 찾기</p>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
