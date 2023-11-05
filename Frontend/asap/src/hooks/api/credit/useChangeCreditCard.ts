import axiosInstance from 'utils/axiosInstance';

// 결제수단 변경(카드회사,카드번호)
interface IChangeCard {
  cardCompany: string;
  cardNumber: string;
}

const useChangeCard = () => {
  const changeCreditCard = async ({ cardCompany, cardNumber }: IChangeCard) => {
    try {
      await axiosInstance({
        method: 'PUT',
        url: `/api/v1/credit/update`,
        data: { cardCompany, cardNumber },
      });
      // 서버에서 받은 응답 처리
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { changeCreditCard };
};

export default useChangeCard;
