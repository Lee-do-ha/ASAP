import axios from 'axios';
import { useState } from 'react';

interface IEmailCode {
  email: string;
  code: string;
}

const useAuthEmail = () => {
  const [postedEmail, setPostedEmail] = useState<boolean>(false);
  const [checkedCode, setCheckedCode] = useState<boolean>(false);

  const postEmail = async (email: string) => {
    setPostedEmail(true);
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/mail/auth-email',
        data: { email },
      });
      if (response.data === 'EMAIL_NOT_SEND') {
        setPostedEmail(false);
      } else {
        setPostedEmail(true);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  const checkEmailCode = async ({ email, code }: IEmailCode) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/mail/check-auth-email',
        data: { email, code },
      });
      if (response.data === 'EMAIL_CODE_NOT_AUTHORIZED') {
        setCheckedCode(false);
      } else {
        setCheckedCode(true);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  const resetEmailStatus = () => {
    setCheckedCode(false);
    setPostedEmail(false);
  };

  return {
    postEmail,
    checkedCode,
    checkEmailCode,
    postedEmail,
    resetEmailStatus,
  };
};

export default useAuthEmail;
