import axiosInstance from 'utils/axiosInstance';

const usePaymentDetail = () => {
  const paymentDetail = async (paymentId: number) => {
    try {
      await axiosInstance({
        method: 'GET',
        url: `/api/v1/payment/detail/${paymentId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { paymentDetail };
};

export default usePaymentDetail;
