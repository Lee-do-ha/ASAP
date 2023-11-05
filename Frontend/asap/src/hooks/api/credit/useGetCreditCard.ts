import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
// 카드회사, 카드번호 조회
interface ICardNotice {
  cardCompany: string;
  cardNumber: string;
}

const useGetCreditCard = () => {
  const [loading, setLoading] = useState(false); // 초기값을 false로 설정
  const [creditCard, setCreditCard] = useState<ICardNotice | null>(null);

  const getCreditCard = async () => {
    try {
      setLoading(true); // 요청 시작 시 로딩 상태를 true로 설정
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/credit/get',
      });
      setCreditCard(response.data);
    } catch (error) {
      console.log('조회 오류:', error);
    } finally {
      setLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getCreditCard();
  }, []);
  return { getCreditCard, loading, creditCard };
};

export default useGetCreditCard;
