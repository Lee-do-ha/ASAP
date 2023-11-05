import axiosInstance from 'utils/axiosInstance';

// 결제수단 삭제
const useDeleteCredit = () => {
  const deleteCreditCard = async () => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/api/v1/credit/delete`,
      });
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { deleteCreditCard };
};

export default useDeleteCredit;
