import axiosInstance from 'utils/axiosInstance';
// 결제수단 등록(카드회사,카드번호)
interface cardInfo {
  cardCompany: string;
  cardNumber: string;
}

const usePostCreditCard = () => {
  const postCreditCard = async ({ cardCompany, cardNumber }: cardInfo) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: `/api/v1/credit/register`,
        data: {
          cardCompany,
          cardNumber,
        },
      });
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { postCreditCard };
};

export default usePostCreditCard;
