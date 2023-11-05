import React, { useState, ChangeEvent, FormEvent } from 'react';
import useAdminLogin from 'hooks/api/admin/useAdminLogin';
import { Input, Button } from '@material-tailwind/react';
import '../../styles/admin/adminLogin.scss';

function AdminLogin() {
  const { adminLogin } = useAdminLogin();
  const [adminId, setAdminId] = useState<string>('');
  const [adminPassword, setAdminPwd] = useState<string>('');

  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAdminId(event.target.value);
  };

  const onPwdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAdminPwd(event.target.value);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await adminLogin({
      adminId,
      adminPassword,
    });
  };

  return (
    <div className="container-custom">
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col justify-center content-center">
          <h1 className="text-3xl font-bold text-center">
            관리자 인증이 필요한 페이지입니다
          </h1>
          <div>
            <div className="my-5 flex justify-center items-center">
              <p className="w-20 font-bold">아이디</p>
              <Input
                label="아이디"
                value={adminId}
                onChange={onIdHandler}
                className="input"
                crossOrigin=""
                required
              />
            </div>
            <div className="my-5 flex justify-center items-center">
              <p className="w-20 font-bold">비밀번호</p>
              <Input
                label="비밀번호"
                value={adminPassword}
                onChange={onPwdHandler}
                className="input"
                type="password"
                crossOrigin=""
                required
              />
            </div>
          </div>
          {/* 로그인 버튼 */}
          <Button
            ripple
            type="submit"
            className="bg-blue self-center w-48 h-10 text-white text-lg flex items-center justify-center"
          >
            로그인
          </Button>
        </div>{' '}
      </form>
    </div>
  );
}

export default AdminLogin;
