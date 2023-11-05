import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import 'styles/auth/SignUp.scss';
import useSignUp from 'hooks/api/auth/useSignUp';
import useCheckId from 'hooks/api/auth/useCheckId';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import useSetWallet from 'hooks/api/wallet/useSetWallet';
import { Input, Button } from '@material-tailwind/react';
import useAuthEmail from 'hooks/api/auth/useAuthEmail';
import Timer from 'components/auth/Timer';
import Modal from 'components/common/Modal';
import Loading from 'components/common/Loading';

interface ITime {
  mm: number;
  ss: number;
}

function SignUp() {
  const { signUp } = useSignUp();
  const { isIdAvailable, setIsIdAvailable, checkIdAvailability } = useCheckId();
  const {
    postEmail,
    checkEmailCode,
    postedEmail,
    checkedCode,
    resetEmailStatus,
  } = useAuthEmail();
  const { createAccount } = useWeb3();
  const { setWallet } = useSetWallet();

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingOn, setIsLoadingOn] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // 비밀 번호 조건
  const hasUpperCase = /[A-Z]/.test(userPassword);
  const hasLowerCase = /[a-z]/.test(userPassword);
  const hasNumber = /[0-9]/.test(userPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userPassword);
  const isLengthValid = userPassword.length >= 8 && userPassword.length <= 16;

  const [userName, setUserName] = useState<string>('');

  const [userEmail, setUserEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');
  const [initialTime, setInitialTime] = useState<ITime>({ mm: 0, ss: 0 });
  const [timerKey, setTimerKey] = useState<number>(0);

  // 아이디 입력
  const onIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsIdAvailable(false);
    setUserId(event.target.value);
  };

  // 아이디 중복 확인 버튼 클릭
  const onIdCheckHandler = async () => {
    await checkIdAvailability(userId);
  };

  // 비밀 번호 입력
  const onPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  // 비밀 번호 확인 입력
  const onConfirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserConfirmPassword(event.target.value);
  };

  // 비밀 번호 조건 확인 메시지
  const passwordMessage = () => {
    if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLengthValid
    ) {
      return (
        <p className="my-2 ms-1 text-red-600">
          비밀번호는 대소문자/숫자/특수문자 혼용 8자이상 16자 이하로
          입력해주세요.
        </p>
      );
    }

    return <p className="my-2 ms-1 text-blue">사용 가능한 비밀번호입니다.</p>;
  };

  // 비밀번호 확인 체크 메시지
  const passwordCheckMessage = () => {
    if (!userPassword || !userConfirmPassword) {
      return null;
    }
    if (userPassword === userConfirmPassword) {
      return <p className="my-2 ms-1 text-blue">비밀번호가 일치합니다.</p>;
    }
    return (
      <p className="my-2 ms-1 text-red-600">비밀번호가 일치하지 않습니다.</p>
    );
  };

  // 이름 입력
  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // 이메일 입력
  const onEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  // 이메일 인증 코드 전송
  const onPostEmailCode = async () => {
    resetEmailStatus();
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    await postEmail(userEmail);
    setInitialTime({ mm: 5, ss: 0 });
    setTimerKey((Key) => Key + 1);
  };

  // 인증 코드 입력
  const onEmailCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(event?.target.value);
  };

  // 인증 코드 확인
  const onCheckEmailCode = async () => {
    await checkEmailCode({ email: userEmail, code: emailCode });
  };

  // 계정 생성 중 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 계정 생성 중 모달 닫음
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 타이머 출력
  const codeTimer = () => {
    if (initialTime.mm === 0 && initialTime.ss === 0) {
      return null;
    }
    if (postedEmail && !checkedCode) {
      return <Timer key={timerKey} mm={initialTime.mm} ss={initialTime.ss} />;
    }
    return null;
  };

  const onWalletHandler = async () => {
    closeModal();
    await setLoading(true);
    const address = await createAccount(userPassword);
    if (address) {
      const id = userId;
      const privateKey = userPassword;
      const res = await setWallet({ id, address, privateKey });
      if (res) {
        await setIsLoadingOn(false);
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        await setLoading(false);
        openModal();
      }
    } else {
      await setLoading(false);
      openModal();
    }
  };

  const onsubmitHandler = async () => {
    if (!isIdAvailable) {
      alert('아이디를 다시 확인해주세요.');
      return;
    }

    if (
      userPassword !== userConfirmPassword ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLengthValid
    ) {
      alert('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (!userName) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!checkedCode) {
      alert('이메일 인증을 확인해주세요.');
      return;
    }

    const response = await signUp({
      id: userId,
      password: userPassword,
      name: userName,
      email: userEmail,
    });

    // 회원가입에 성공하면 계정 생성하기
    if (response) {
      onWalletHandler();
    }
  };

  return (
    <div className="container mx-auto form-container page-container">
      <div className="flex justify-center my-8">
        <p className="font-bold text-6xl text-blue">Sign Up</p>
      </div>

      {/* 아이디 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">아이디</p>
        <div className="relative flex w-full my-3">
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
          {isIdAvailable ? (
            <Button
              size="sm"
              color="blue"
              className="!absolute right-1 top-1 rounded btn-width"
              ripple={false}
              style={{ cursor: 'auto' }}
            >
              아이디 중복 확인
            </Button>
          ) : (
            <Button
              size="sm"
              color={userId ? 'gray' : 'blue-gray'}
              disabled={!userId}
              className="!absolute right-1 top-1 rounded btn-width"
              onClick={onIdCheckHandler}
            >
              아이디 중복 확인
            </Button>
          )}
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">비밀번호</p>
        <div className="mt-3">
          <Input
            type="password"
            value={userPassword}
            onChange={onPasswordHandler}
            label="비밀번호"
            crossOrigin=""
          />
        </div>
        <div className="my-3">
          <Input
            type="password"
            value={userConfirmPassword}
            onChange={onConfirmPasswordHandler}
            label="비밀번호 확인"
            crossOrigin=""
          />
          {passwordMessage()}
          {passwordCheckMessage()}
        </div>
      </div>

      {/* 이름 입력 */}
      <div className="mb-7">
        <p className="text-lg font-extrabold text-blue">이름</p>
        <div className="my-3">
          <Input
            label="이름"
            value={userName}
            onChange={onNameHandler}
            crossOrigin=""
          />
        </div>
      </div>

      {/* 이메일 입력 */}
      <p className="text-lg font-extrabold text-blue">이메일</p>
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
        {postedEmail ? (
          <Button
            size="sm"
            color="blue"
            disabled={!userEmail}
            className="!absolute right-1 top-1 rounded btn-width"
            onClick={onPostEmailCode}
          >
            인증 코드 재전송
          </Button>
        ) : (
          <Button
            size="sm"
            color={userEmail ? 'gray' : 'blue-gray'}
            disabled={!userEmail}
            className="!absolute right-1 top-1 rounded btn-width"
            onClick={onPostEmailCode}
          >
            인증 코드 전송
          </Button>
        )}
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
        <div className="flex !absolute right-1 top-1">
          {codeTimer()}
          {checkedCode ? (
            <Button
              size="sm"
              color="blue"
              disabled={!emailCode}
              className="rounded btn-width"
              onClick={onCheckEmailCode}
            >
              인증 완료
            </Button>
          ) : (
            <Button
              size="sm"
              color={emailCode ? 'gray' : 'blue-gray'}
              disabled={!emailCode}
              className="rounded btn-width"
              onClick={onCheckEmailCode}
            >
              인증 코드 확인
            </Button>
          )}
        </div>
      </div>
      {/* 회원가입 버튼 */}
      <div className="flex justify-center my-9">
        <Button ripple onClick={onsubmitHandler} className="bg-blue btn-width">
          회원 가입
        </Button>
      </div>

      <hr className="line-blue" />

      <div className="flex justify-center my-5">
        <p className="text-xl text-gray-500 font-bold me-3">
          이미 회원이신가요 ?
        </p>
        <Link to="/login" className="text-xl font-bold text-blue">
          Login
        </Link>
      </div>

      {/* 지갑 생성 중 로딩 및 생성 완료 */}
      {loading ? (
        <Loading
          isOn={isLoadingOn}
          content={
            isLoadingOn ? (
              '지갑을 생성중입니다'
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-center">지갑이 생성되었습니다</div>
                <div>로그인해서 ASAP을 사용해보세요</div>
              </div>
            )
          }
        />
      ) : null}

      {/* 지갑 생성 실패 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col justify-center pt-2">
          <p className="pb-2">지갑 생성이 실패하였습니다.</p>
          <Button
            onClick={onWalletHandler}
            className="text-base font-bold p-2 bg-blue-500"
          >
            지갑 다시 생성하기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default SignUp;
