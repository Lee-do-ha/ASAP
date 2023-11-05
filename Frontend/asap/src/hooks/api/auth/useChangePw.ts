import axiosInstance from 'utils/axiosInstance';

interface IChangePw {
  id: string;
  password: string;
}

const useChangePw = () => {
  const changePw = async ({ id, password }: IChangePw) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/find-password',
        data: { id, password },
      });
      // 서버에서 받은 응답 처리
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { changePw };
};

export default useChangePw;
