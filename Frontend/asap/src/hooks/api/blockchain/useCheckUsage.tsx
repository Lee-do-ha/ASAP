import axiosInstance from 'utils/axiosInstance';

interface IUsage {
  apiTitle: string;
  startDate: string;
  endDate: string;
}

const useCheckUsage = () => {
  const checkUsage = async ({ apiTitle, startDate, endDate }: IUsage) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/transaction',
        params: { apiTitle, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.log('서버 오류:', error);
      return null;
    }
  };

  return { checkUsage };
};

export default useCheckUsage;
