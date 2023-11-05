import { useState } from 'react';
import axios from 'axios';

const useCheckId = () => {
  const [isIdAvailable, setIsIdAvailable] = useState<boolean>(false);

  const checkIdAvailability = async (id: string) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/check-id',
        data: { id },
      });
      if (response.data === 'USER_ID_DUPLICATED') {
        // 중복 아이디가 있는 경우
        setIsIdAvailable(false);
        alert('사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요');
      } else {
        // 중복 아이디가 없는 경우
        setIsIdAvailable(true);
        alert('사용가능한 아이디입니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return { isIdAvailable, setIsIdAvailable, checkIdAvailability };
};

export default useCheckId;
