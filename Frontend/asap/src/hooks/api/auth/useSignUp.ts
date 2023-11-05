import axios from 'axios';

interface UserInfo {
  id: string;
  password: string;
  name: string;
  email: string;
}

const useSignUp = () => {
  const signUp = async ({ id, password, name, email }: UserInfo) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/signup',
        data: { id, password, name, email },
      });
      // 서버에서 받은 응답 처리
      if (response.status === 200) {
        return response;
      }
      return null;
    } catch (error) {
      console.log('서버 오류:', error);
      return null;
    }
  };

  return { signUp };
};

export default useSignUp;
