import axiosInstance from 'utils/axiosInstance';

const useCheckApply = () => {
  const checkApply = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `https://j9c202.p.ssafy.io/api/v1/purpose/check-apply/${id}`,
      });
      return response.data;
    } catch (error) {
      console.log('서버 오류:', error);
    }
    return false;
  };

  return { checkApply };
};

export default useCheckApply;
