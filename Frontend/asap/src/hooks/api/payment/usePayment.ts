import axiosInstance from 'utils/axiosInstance';

interface paymentInfo {
  cardCompany: string;
  cardNumber: string;
  createAt: string;
  fee: number;
}
const usePayment = () => {
  const payment = async ({
    cardCompany,
    cardNumber,
    createAt,
    fee,
  }: paymentInfo) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/api/v1/payment/approve',
        data: {
          cardCompany,
          cardNumber,
          createAt,
          fee,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { payment };
};

export default usePayment;
