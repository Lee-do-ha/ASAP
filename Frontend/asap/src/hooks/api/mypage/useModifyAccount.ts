import axiosInstance from 'utils/axiosInstance';

interface IModifyMember {
  name: string;
  email: string;
}
const useModifyAccount = () => {
  const modifyMemberInfo = async ({ name, email }: IModifyMember) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/me',
        data: { name, email },
      });
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { modifyMemberInfo };
};

export default useModifyAccount;
