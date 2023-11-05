import axiosInstance from 'utils/axiosInstance';

interface UserInfo {
  apiId: string;
  purpose: string;
  industry: string;
}

const useSetUserInfo = () => {
  const setUserInfo = async ({ apiId, purpose, industry }: UserInfo) => {
    const apiIdNumber = Number(apiId);
    console.log(apiId, purpose, industry);
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/purpose/use',
        data: { apiId: apiIdNumber, purpose, industry },
      });
      if (response.data === 'PURPOSE_DUPLICATED') {
        console.log('API 사용 신청 실패');
      } else {
        console.log('API 사용 신청 성공');
      }
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  };

  return { setUserInfo };
};

export default useSetUserInfo;
