import axiosInstance from 'utils/axiosInstance';

interface IFindPw {
  email: string;
  id: string;
}

const useFindPw = () => {
  const findPw = async ({ email, id }: IFindPw) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/find-password',
        data: { email, id },
      });
      // 서버에서 받은 응답 처리
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { findPw };
};

export default useFindPw;
